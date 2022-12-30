<template>
    <div class="container" ref="container">
        <div class="left-container">
            <slash-cell :store="store" />
            <left-pattern :data-list="formattedDataList" ref="leftRef" :titles="titles" />
        </div>
        <div class="right-container" ref="rightContainer">
            <right-pattern :datelist="datelist" :eventList="formattedDataList" @scrollY="handleContScroll"
                @item-click="handleClick" @item-drop="handleItemDrop" ref="right" />
        </div>
    </div>
</template>

<script>
import SlashCell from "./components/slash-cell.vue"
import FormatDate from "./date"
import leftPattern from "./components/left/left-pattern.vue"
import rightPattern from "./components/right/right-pattern.vue"
import { createStore, mapStates } from "./store/helper"
const dayjs = require('dayjs')

export default {
    name: "gantt-next",
    components: { leftPattern, rightPattern, SlashCell },
    props: {
        dataList: {
            type: Array,
            default: () => [],
        },
        days: {
            type: Number,
            default: 10,
        },
        titles: {
            type: Array,
        },
        start_timestamp: {
            type: Number,
        },
    },
    data() {
        this.store = createStore(this, {
            rowKey: 'this.rowKey',
            defaultExpandAll: 'this.defaultExpandAll',
            selectOnIndeterminate: this.selectOnIndeterminate,
            // TreeTable 的相关配置
            indent: this.indent,
            lazy: this.lazy,
        })

        return {
            datelist: [],
            formattedDataList: [],
            dateInstance: null,
        }
    },
    computed: {
        ...mapStates({
            selection: "selection",
            columns: "columns",
            tableData: "data",
            rowKey: "rowKey"
        }),
    },
    mounted() {
        const dateInstance = (this.dateInstance = new FormatDate(this.days, this.start_timestamp))
        this.datelist = dateInstance.list

        this.formattedDataList = this.formatDataList(dateInstance, this.dataList)

        this.calcRightContainerWidth()

        console.log(dayjs().format('yyyy-mm'))
    },
    methods: {
        // 格式化数据
        formatDataList(dateInstance, dataList) {
            // 每项中都加入 eventList
            const formattedDataList = dataList.map((row) => {
                row.eventList = dateInstance.getDataItemList(row.items, dateInstance.list, this.start_timestamp)
                return row
            })
            return formattedDataList
        },
        handleContScroll(y, maxHeight) {
            this.$refs.leftRef && this.$refs.leftRef.scrollTo(y, maxHeight)
        },
        calcRightContainerWidth() {
            const containerWidth = this.$refs.container.offsetWidth
            this.$refs.rightContainer.style.width = `${containerWidth - 200}px`
        },
        handleClick(data) {
            this.$emit("item-click", data)
        },
        handleItemDrop(index, from, to) {
            const eventItems = this.formattedDataList[index].eventList // 事件数据
            const dataItems = this.formattedDataList[index].items // 源数据

            // 在事件列表中的入点和落点的数据
            const fromItem = eventItems[from]
            const toItem = eventItems[to]

            if (fromItem.data.id && toItem.data.id) {
                // 落在事件上
                this.dropOnItem(fromItem, toItem, dataItems, index)
            } else if (!this.isCross(fromItem, toItem, eventItems)) {
                // 落在空点
                this.dropOnEmpty(fromItem, toItem, dataItems, index)
            } else {
                this.dropCross()
            }

            this.$emit("item-drop", fromItem, toItem)
        },
        // 判断是否相交
        isCross(fromItem, toItem, eventItems) {
            // 时间间隔通过计算原有 data 里的时间获得
            const intervalDays =
                fromItem.data.startAt && fromItem.data.endAt
                    ? FormatDate.getIntervalDays(fromItem.data.startAt, fromItem.data.endAt)
                    : fromItem.days - 1
            if (!intervalDays) {
                console.error("滑块长度为0，数据有误")
                return
            }
            // 新的时间范围
            const newRange = {
                startAt: toItem.startDay.date_string,
                endAt: FormatDate.addDays(toItem.startDay.date_string, intervalDays),
            }
            // 过滤无关项
            const filteredEventItems = eventItems.filter((item) => {
                if (!item.data.id || item.data.id === fromItem.data.id) {
                    return false
                } else {
                    // 交叉判断
                    const rangeStart = new Date(newRange.startAt)
                    const rangeEnd = new Date(newRange.endAt)
                    const itemStart = new Date(item.data.startAt)
                    const itemEnd = new Date(item.data.endAt)

                    return (
                        (itemStart <= rangeStart && rangeStart <= itemEnd) ||
                        (itemStart <= rangeEnd && rangeEnd <= itemEnd) ||
                        (rangeStart <= itemStart && itemEnd <= rangeEnd)
                    )
                }
            })

            // console.log("newRange", newRange, filteredEventItems)
            return filteredEventItems.length
        },
        // 落在了空地上
        dropOnEmpty(fromItem, toItem, dataItems, rowIndex) {
            // 时间间隔通过计算原有 data 里的时间获得
            const intervalDays =
                fromItem.data.startAt && fromItem.data.endAt
                    ? FormatDate.getIntervalDays(fromItem.data.startAt, fromItem.data.endAt)
                    : fromItem.days - 1
            // 替换 源数据 dataItem 中的时间信息, 这里直接修改了应用对象里的时间数据
            const newFromDataItem = Object.assign({}, fromItem.data, {
                startAt: toItem.startDay.date_string,
                endAt: FormatDate.addDays(toItem.startDay.date_string, intervalDays),
            })

            const dataIndex = dataItems.findIndex((item) => item.id === newFromDataItem.id)
            dataItems.splice(dataIndex, 1, newFromDataItem)
            // 按开始时间 startAt 重新排序
            const sortedDataItems = dataItems.sort((a, b) => new Date(a.startAt) - new Date(b.startAt))

            // 更新数据源中的 eventItems
            const newEventList = this.dateInstance.getDataItemList(
                sortedDataItems,
                this.dateInstance.list,
                this.start_timestamp
            )
            this.$set(this.formattedDataList[rowIndex], "eventList", newEventList)
            this.$refs.right.$forceUpdate()
        },
        // 落点有交叉
        dropCross() {
            console.error("事件不可相交")
            this.$emit("drag-error", "事件不可相交")
        },
        // 落在事件上
        dropOnItem(fromItem, toItem, dataItems, rowIndex) {
            // 创建新的事件数据中的时间信息
            const newFromDataItem = Object.assign({}, fromItem.data, {
                startAt: toItem.data.startAt,
                endAt: toItem.data.endAt,
            })
            const newToDataItem = Object.assign({}, toItem.data, {
                startAt: fromItem.data.startAt,
                endAt: fromItem.data.endAt,
            })
            // 替换 源数据中 原有的时间信息
            const fromIndex = dataItems.findIndex((item) => item.id === newFromDataItem.id)
            dataItems.splice(fromIndex, 1, newFromDataItem)
            const toIndex = dataItems.findIndex((item) => item.id === newToDataItem.id)
            dataItems.splice(toIndex, 1, newToDataItem)

            // 按开始时间 startAt 重新排序
            const sortedDataItems = dataItems.sort((a, b) => new Date(a.startAt) - new Date(b.startAt))

            // 更新数据源中的 eventItems
            const newEventList = this.dateInstance.getDataItemList(
                sortedDataItems,
                this.dateInstance.list,
                this.start_timestamp
            )
            this.$set(this.formattedDataList[rowIndex], "eventList", newEventList)
            this.$refs.right.$forceUpdate()
        },
        getData() {
            let copyedList = JSON.parse(JSON.stringify(this.formattedDataList))
            copyedList = copyedList.map((item) => {
                delete item.eventList
                return item
            })
            return copyedList
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
* {
    box-sizing: border-box;
}

.container {
    height: 100%;
    width: 100%;
    position: relative;
    // border: 1px solid #ccc;
    display: flex;

    .left-container {
        flex: 200px 0 0;
        height: 100%;
        border: 1px solid #ccc;
    }

    .right-container {
        flex: 1;
        height: 100%;
        border: 1px solid #ccc;
    }
}
</style>
