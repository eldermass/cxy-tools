<template>
    <div class="event-row" :style="totalLengthStyle" ref="eventRow">
        <div v-for="(row, i) in rows" :key="i" :style="{ height: dayBoxHeight + 'px' }">
            <row-item-back v-for="(date, index) in daysList" :key="index" :box-lenght="dayBoxWidth" :date="date" />
        </div>
    </div>
</template>
<script>
import rowItemBack from "./row-item-back.vue"
import { mapStates } from "../../store/helper"

export default {
    name: "row-mask",
    components: { rowItemBack },
    props: {
        store: {
            required: true
        },
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
    computed: {
        ...mapStates({
            totalLengthStyle: (state) => ({ 
                width: state.daysList.length * state.dayBoxWidth + 'px',
                height: state.rows.length * state.dayBoxHeight + 'px'
             }),
            daysList: 'daysList',
            dayBoxWidth: "dayBoxWidth",
            rows: 'rows',
            dayBoxHeight: 'dayBoxHeight'
        }),
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
    // border: 1px solid;
    text-align: left;
    overflow: hidden;
    position: relative;
}
</style>
