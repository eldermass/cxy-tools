<template>
    <div class="container">
        <div class="left-container">
            <slash-cell :store="store" />
            <left-pattern :store="store" />
        </div>
        <div class="right-container">
            <right-pattern :store="store" />
        </div>
    </div>
</template>

<script>
import SlashCell from "./components/slash-cell.vue"
import leftPattern from "./components/left/left-pattern.vue"
import rightPattern from "./components/right/right-pattern.vue"
import { createStore, mapStates } from "./store/helper"
import { getDateList } from './helper'
// const dayjs = require('dayjs')

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
        start_time: {
            type: String,
            default: '2023-01-01'
        }
    },
    data() {
        this.store = createStore(this, {
            dayBoxWidth: 60,
            dayBoxHeight: 40
        })

        return {}
    },
    computed: {
        ...mapStates({}),
    },
    mounted() {
        // 这个有时区差距，还没解决
        this.store.commit('setTimeNow', this.start_time)
        this.store.commit('setDaysList', getDateList(this.days, this.start_time))
    },
    methods: {
        handleClick() {
            console.log('双击任务')
        },
        getData() {
            console.log('获取数据')
        },
        setDayBoxWidth(width = 90) {
            this.store.commit('setDayBoxWidth', width)
        }
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
        position: absolute;
        left: 1px;
        top: 0;
        width: 100%;
        height: 100%;
        padding-left: 200px;
        border: 1px solid #ccc;
    }
}
</style>
