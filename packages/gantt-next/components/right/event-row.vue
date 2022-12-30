<template>
    <div class="event-row" ref="eventRow">
        <div class="back" ref="back">
            <row-item-back v-for="(date, index) in dates" :key="index" :date="date" />
        </div>
        <div class="front" ref="front">
            <row-item
                v-for="(item, index) in datalist"
                :key="index"
                :row-data="item"
                :days="item.days"
                :item-index="index"
                :event-index="eventIndex"
                @item-click="handleClick"
                @item-drop="handleItemDrop"
            />
        </div>
    </div>
</template>
<script>
import rowItemBack from "./row-item-back.vue"
import rowItem from "./row-item.vue"

export default {
    name: "event-row",
    components: { rowItemBack, rowItem },
    props: {
        list: {
            type: Array,
            default: () => [],
        },
        datalist: {
            type: Array,
            default: () => [],
        },
        eventIndex: {
            type: Number,
            default: -1
        }
    },
    data() {
        return {
            dates: [
                // {
                //     year: 2022,
                //     month: 8,
                //     date: 2,
                //     day: 2,
                //     is_last_date: false,
                //     is_last_month: false,
                //     date_string: "2022-8-2",
                // },
            ],
        }
    },
    mounted() {
        this.dates = this.list
        this.calcContainerWidth()
    },
    methods: {
        calcContainerWidth() {
            // const backRef = this.$refs.back
            // const frontRef = this.$refs.front
            const eventRowRef = this.$refs.eventRow
            const width = this.dates.length * 30

            // backRef.style.width = `${width}px`
            // frontRef.style.width = `${width}px`
            eventRowRef.style.width = `${width}px`

            // console.log("calc width: ", width)
        },
        handleClick(data) {
            this.$emit("item-click", data)
        },
        handleItemDrop(from, to) {
            this.$emit("item-drop", this.eventIndex, from, to)
        },
    },
    watch: {
        list(newList) {
            if (newList.length) {
                this.dates = this.list
                this.$nextTick(() => {
                    this.calcContainerWidth()
                })
            }
        },
    },
}
</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}
.event-row {
    height: 40px;
    // border: 1px solid;
    text-align: left;
    overflow: hidden;
    position: relative;
    .front {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
    }
    .back {
        height: 100%;
    }
}
</style>
