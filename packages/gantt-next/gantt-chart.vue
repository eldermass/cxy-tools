<template>
    <div class="gantt-container">
        <div class="left-container">
            <slash-cell :store="store" />
            <left-pattern :store="store" />
        </div>
        <div class="right-container" @mousewheel.stop="handleMouseWheel">
            <right-pattern :store="store" :on-right-menu-click="listenRightMenu" />
        </div>
        <setting-layer ref="setting" :fresh-setting="freshSetting" />
    </div>
</template>

<script>
import slashCell from "./components/slash-cell.vue"
import leftPattern from "./components/left/left-pattern.vue"
import rightPattern from "./components/right/right-pattern.vue"
import { createStore, mapStates } from "./store/helper"
import { getDateList } from './helper'
import settingLayer from "./components/setting.vue"
// import dayjs from 'dayjs'

export default {
    name: "gantt-next",
    components: { leftPattern, rightPattern, slashCell, settingLayer },
    props: {
        days: {
            type: Number,
            default: 10,
        },
        oDayBoxHeight: {
            type: Number,
            default: 40,
        },
        oDayBoxWidth: {
            type: Number,
            default: 60,
        },
        titles: {
            type: Array,
            default: () => []
        },
        tasks: {
            type: Array,
            default: () => []
        },
        links: {
            type: Array,
            default: () => []
        },
        rows: {
            type: Array,
            default: () => []
        },
        start_time: {
            type: String,
            default: '2023-01-01'
        },
        adsorbType: {
            type: Number,
            default: 0
        },
        // 拖拽辅助线
        assistLine: {
            type: Boolean,
            default: true
        },
        rightMenulists: {
            type: Array,
            default: () => []
        }
    },
    data() {
        const adsorbType = localStorage.getItem('gant_adsorb_type')
        const dayWidth = localStorage.getItem('gant_day_width')
        this.store = createStore(this, {
            dayBoxWidth: dayWidth !== null ? Number(dayWidth) : this.oDayBoxWidth,
            dayBoxHeight: this.oDayBoxHeight,
            titleGroups: this.titles,
            tasks: this.tasks,
            originLinks: this.links,
            rows: this.rows,
            adsorbType: adsorbType !== null ? Number(adsorbType) : this.adsorbType,
            assistLine: this.assistLine,
            rightMenulists: this.rightMenulists
        })

        return {}
    },
    computed: {
        ...mapStates({ dayBoxWidth: 'dayBoxWidth' }),
    },
    mounted() {
        // 这个有时区差距，还没解决
        this.store.commit('setTimeNow', this.start_time)
        this.setDayList()
        this.store.commit('listenTaskDbClick', this.handleDbClick)
        this.store.commit('listenTaskChange', this.handleTaskChange)
        this.store.commit('listenTaskChangeError', this.handleChangeError)
        document.addEventListener('keydown', this.handleKeyDown)
    },
    methods: {
        setDayList() {
            const showDays = localStorage.getItem('gant_show_days')
            const days = showDays !== null ? Number(showDays) : this.days
            this.store.commit('setDaysList', getDateList(days, this.start_time))
        },
        handleMouseWheel(e) {
            // 里面一层也有这个函数，但是不影响
            if ((e.wheelDelta && e.ctrlKey) || e.detail) {
                e.preventDefault()
                const detail = e.detail || e.wheelDelta
                let width = this.dayBoxWidth
                if (detail > 0) {
                    width += 5
                } else {
                    width -= 5
                }

                this.store.commit('setDayBoxWidth', width <= 8 ? 8 : width)
            }
        },
        handleDbClick(task) {
            this.$emit('task-dbclick', task)
        },
        handleTaskChange(task, origin_task) {
            this.$emit('task-change', task, origin_task)
        },
        handleChangeError(task, origin_task, type) {
            this.$emit('task-change-error', task, origin_task, type)
        },
        getData(onlyChanged) {
            return this.store.getTasks(onlyChanged)
        },
        setDayBoxWidth(width = 90) {
            this.store.commit('setDayBoxWidth', width)
        },
        setAdsorbType(type) {
            this.store.commit('setAdsorbType', type)
        },
        changeTaskItem(task_id, change_obj = {}) {
            this.store.commit('changeTaskItem', task_id, change_obj)
        },
        // 设置
        handleKeyDown(e) {
            if (e.keyCode === 83 && e.ctrlKey && e.shiftKey) {
                this.$refs.setting.show()
            }
        },
        listenRightMenu(type, params) {
            if (type === 'setting') {
                this.$refs.setting.show()
            } else {
                this.$emit(`menu-${type}`, params)
            }
        },
        freshSetting() {
            const adsorbType = localStorage.getItem('gant_adsorb_type')
            const dayWidth = localStorage.getItem('gant_day_width')
            this.setDayBoxWidth(dayWidth !== null ? Number(dayWidth) : this.oDayBoxWidth)
            this.setAdsorbType(adsorbType !== null ? Number(adsorbType) : this.adsorbType)
            this.setDayList()
        }
    },
    watch: {
        titles(title_groups) {
            this.store.commit('setTitleGroups', title_groups)
        },
        rows(new_rows) {
            this.store.commit('setRows', new_rows)
        },
        tasks(new_tasks) {
            this.store.commit('setTasks', new_tasks)
        },
        links(new_links) {
            this.store.commit('setLinks', new_links)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
* {
    box-sizing: border-box;
}

.gantt-container {
    height: 100%;
    width: 100%;
    position: relative;
    // border: 1px solid #ccc;
    display: flex;

    .left-container {
        flex: 200px 0 0;
        height: 100%;
        border: 1px solid #ccc;
        border-right: none;
        z-index: 10;
    }

    .right-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        padding-left: 200px;
        border: 1px solid #ccc;
    }
}
</style>
