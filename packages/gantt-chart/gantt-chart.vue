<template>
    <div class="container" ref="container">
        <div class="left-container">
            <left-pattern :data-list="eventList" ref="leftRef" :title="leftTitle" />
        </div>
        <div class="right-container" ref="rightContainer">
            <right-pattern
                :datelist="datelist"
                :eventList="eventList"
                @scrollY="handleContScroll"
                @item-click="handleClick"
                @item-drop="handleItemDrop"
                ref="right"
            />
        </div>
    </div>
</template>

<script>
import FormatDate from "./date"
import leftPattern from "./components/left/left-pattern.vue"
import rightPattern from "./components/right/right-pattern.vue"

export default {
    name: "gantt-chart",
    components: { leftPattern, rightPattern },
    props: {
        dataList: {
            type: Array,
            default: () => [],
        },
        days: {
            type: Number,
            default: 10,
        },
        leftTitle: {
            type: String
        },
        start_timestamp: {
            type: Number
        }
    },
    data() {
        return {
            datelist: [],
            eventList: [],
            dateInstance: null,
        }
    },
    mounted() {
        const dateInstance = (this.dateInstance = new FormatDate(this.days, this.start_timestamp))
        this.datelist = dateInstance.list

        this.eventList = this.formatDataList(dateInstance, this.dataList)

        this.calcRightContainerWidth()
        console.log("hello: gantt-chart！！！")
    },
    methods: {
        formatDataList(dateInstance, dataList) {
            // 每项中都加入 eventList
            const eventList = dataList.map((row) => {
                row.eventList = dateInstance.getDataItemList(row.items, dateInstance.list)
                return row
            })
            return eventList
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
            const eventItems = this.eventList[index].eventList // 数据事件
            const dataItems = this.eventList[index].items // 源数据

            const fromItem = eventItems[from]
            const toItem = eventItems[to]

            // 时间间隔通过计算原有 data 里的时间获得
            const intervalDays =
                fromItem.data.startAt && fromItem.data.endAt
                    ? FormatDate.getIntervalDays(fromItem.data.startAt, fromItem.data.endAt)
                    : fromItem.days - 1
            // 重塑 dataitem
            const newFromDataItem = Object.assign({}, fromItem.data, {
                startAt: toItem.startDay.date_string,
                endAt: FormatDate.addDays(toItem.startDay.date_string, intervalDays),
            })

            const dataIndex = dataItems.findIndex((item) => item.id === newFromDataItem.id)
            dataItems.splice(dataIndex, 1, newFromDataItem)
            // startAt 排序
            const sortedDataItems = dataItems.sort((a, b) => new Date(a.startAt) - new Date(b.startAt))

            // 更新 eventItems
            const newEventList = this.dateInstance.getDataItemList(sortedDataItems, this.dateInstance.list)
            this.$set(this.eventList[index], "eventList", newEventList)
            this.$refs.right.$forceUpdate()

            this.$emit("item-drop", newFromDataItem)
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
    border: 1px solid #ccc;
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
