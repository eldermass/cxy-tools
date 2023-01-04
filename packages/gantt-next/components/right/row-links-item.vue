<template>
    <div class="row-links-item">
        <div class="link-line" :style="sourceItemStyle"></div>
        <div class="link-line" :style="targetItemStyle"></div>
        <div v-if="linkStep === 2" class="link-line-vertical" :style="dVerticalLineStyle"></div>
        <div v-if="linkStep === 2" class="link-line" :style="dHorizontalLineStyle"></div>
    </div>
</template>
<script>
import { mapStates } from "../../store/helper"
const dayjs = require('dayjs')

export default {
    name: "row-links-item",
    components: {},
    props: {
        store: {
            required: true
        },
        link: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
        }
    },
    // 标头线长14px, 在start和end时，left的距离是不一样的
    computed: {
        sourceLeft() {
            const diffTime = dayjs(this.sourceTask.start_date).diff(this.nowTime)
            const timeOffset = (diffTime / 86400000)
            let left = (timeOffset + this.sourceTask.duration).toFixed(2) * this.dayBoxWidth
            if (this.link.source_point === 'start') {
                left = timeOffset.toFixed(2) * this.dayBoxWidth - 14
            }
            return left
        },
        sourceItemStyle() {
            return {
                left: this.sourceLeft + 'px',
                top: this.sourceTask.row_index * this.dayBoxHeight + 'px',
                marginTop: this.dayBoxHeight / 2 + 'px'
            }
        },
        targetItemStyle() {
            const diffTime = dayjs(this.targetTask.start_date).diff(this.nowTime)
            const timeOffset = (diffTime / 86400000)
            let left = (timeOffset + this.targetTask.duration).toFixed(2) * this.dayBoxWidth + 'px'
            if (this.link.target_point === 'start') {
                left = timeOffset.toFixed(2) * this.dayBoxWidth - 14 + 'px'
            }

            return {
                left,
                top: this.targetTask.row_index * this.dayBoxHeight + 'px',
                marginTop: this.dayBoxHeight / 2 + 'px'
            }
        },
        dVerticalLineStyle() {
            const halfBoxHeight = this.dayBoxHeight / 2
            let left = this.sourceLeft
            if (this.link.source_point === 'end') {
                left = left + 12
            }
            // 计算高度
            const diff_row = Math.abs(this.targetTask.row_index - this.sourceTask.row_index)

            return {
                top: halfBoxHeight + 'px',
                left: left + 'px',
                height: diff_row * this.dayBoxHeight + 'px'
            }
        },
        dHorizontalLineStyle() {
            let left = this.sourceLeft
            if (this.link.source_point === 'end') {
                left = left + 12
            }
            // 计算高度
            const diff_row = Math.abs(this.targetTask.row_index - this.sourceTask.row_index)
            // 计算宽度
            const diff_index = dayjs(this.targetTask.start_date).diff(this.sourceTask.start_date)
            const offsetDay = (diff_index)/86400000 - this.sourceTask.duration
            return {
                left: left + 'px',
                top: diff_row * this.dayBoxHeight + this.dayBoxHeight / 2 + 'px',
                width: offsetDay * this.dayBoxWidth  - 2 * 13 + 'px'
            }
        },
        sourceTask() {
            return this.tasks.find(task => task.task_id === this.link.source_id)
        },
        targetTask() {
            return this.tasks.find(task => task.task_id === this.link.target_id)
        },
        linkStep() {
            return 2
        },
        ...mapStates({
            tasks: 'tasks',
            nowTime: 'nowTime',
            dayBoxHeight: 'dayBoxHeight',
            dayBoxWidth: 'dayBoxWidth'
        })
    },
    mounted() {
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}

.row-links-item {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    .link-line {
        position: absolute;
        height: 2px;
        width: 14px;
        background-color: #ffa011;
    }

    .link-line-vertical {
        position: absolute;
        height: 14px;
        width: 2px;
        background-color: #ffa011;
    }
}
</style>
