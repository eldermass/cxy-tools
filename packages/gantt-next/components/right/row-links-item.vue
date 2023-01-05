<template>
    <div class="row-links-item">
        <div class="link-line" :style="sourceItemStyle"></div>
        <div class="link-line" :style="targetItemStyle"></div>
        <div v-if="linkStep <= 4" class="link-line-vertical" :style="dVerticalLineStyle"></div>
        <div v-if="linkStep <= 4" class="link-line" :style="dHorizontalLineStyle"></div>
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
        // 判断连线的方式
        linkStep() {
            // 1234 为2步连
            // 前前
            if (this.link.source_point === 'start' && this.link.target_point === 'start') {
                // 只有一种链接方式，c字形
                return 1
            }
            // 前后
            else if (this.link.source_point === 'start' && this.link.target_point === 'end') {
                return 2
            }
            // 后前
            else if (this.link.source_point === 'end' && this.link.target_point === 'start') {
                return 3
            }
            // 后后
            else if (this.link.source_point === 'end' && this.link.target_point === 'end') {
                return 4
            }
            return 0
        },
        // 两端突出
        sourceItemStyle() {
            // 默认为start
            let left = this.sourcePostion.left - 14
            if (this.link.source_point === 'end') {
                left = this.sourcePostion.right
            }
            return {
                left: left + 'px',
                top: this.sourcePostion.top + this.dayBoxHeight / 2 - 1 + 'px'
            }
        },
        targetItemStyle() {
            // 默认为start
            let left = this.targetPostion.left - 14
            if (this.link.target_point === 'end') {
                left = this.targetPostion.right
            }

            return {
                left: left + 'px',
                top: this.targetPostion.top + this.dayBoxHeight / 2 - 1 + 'px'
            }
        },
        // 开始对象
        sourceTask() {
            return this.tasks.find(task => task.task_id === this.link.source_id)
        },
        sourcePostion() {
            const diffTime = dayjs(this.sourceTask.start_date).diff(this.nowTime)
            const timeOffsetNow = (diffTime / 86400000)
            return {
                left: timeOffsetNow.toFixed(2) * this.dayBoxWidth,
                right: (timeOffsetNow + this.sourceTask.duration).toFixed(2) * this.dayBoxWidth,
                top: this.sourceTask.row_index * this.dayBoxHeight
            }
        },
        // 结束对象
        targetTask() {
            return this.tasks.find(task => task.task_id === this.link.target_id)
        },
        targetPostion() {
            const diffTime = dayjs(this.targetTask.start_date).diff(this.nowTime)
            const timeOffsetNow = (diffTime / 86400000)
            return {
                left: timeOffsetNow.toFixed(2) * this.dayBoxWidth,
                right: (timeOffsetNow + this.targetTask.duration).toFixed(2) * this.dayBoxWidth,
                top: this.targetTask.row_index * this.dayBoxHeight
            }
        },
        // step 1 的连线
        dVerticalLineStyle() {
            // 竖线
            const height = Math.abs(this.targetPostion.top - this.sourcePostion.top)
            const top = Math.min(this.targetPostion.top, this.sourcePostion.top)
            // 
            let left = 0
            switch (this.linkStep) {
                case 1:
                    left = Math.min(this.targetPostion.left, this.sourcePostion.left) - 14
                    break
                case 2:
                    left = Math.min(this.targetPostion.right, this.sourcePostion.right) + 12
                    break
                case 3:
                    left = Math.min(this.targetPostion.right, this.sourcePostion.right) + 12
                    break
                case 4:
                    left = Math.max(this.targetPostion.right, this.sourcePostion.right) + 12
                    break

            }

            return {
                top: top + this.dayBoxHeight / 2 + 'px',
                left: left + 'px',
                height: height + 'px'
            }
        },
        dHorizontalLineStyle() {
            // 横线
            let width = 0, top = 0, left = 0
            switch (this.linkStep) {
                case 1:
                    left = Math.min(this.targetPostion.left, this.sourcePostion.left) - 14
                    width = Math.abs(this.targetPostion.left - this.sourcePostion.left)
                    // 谁差补谁
                    top = this.targetPostion.left > this.sourcePostion.left ? this.targetPostion.top : this.sourcePostion.top
                    break
                case 2:
                    width = Math.min(Math.abs(this.targetPostion.left - this.sourcePostion.right), Math.abs(this.targetPostion.right - this.sourcePostion.left)) - 26
                    top = this.targetPostion.left > this.sourcePostion.left ? this.targetPostion.top : this.sourcePostion.top
                    left = this.targetPostion.left > this.sourcePostion.right ? this.sourcePostion.right : this.targetPostion.right
                    left += 12
                    break
                case 3:
                    width = Math.min(Math.abs(this.targetPostion.left - this.sourcePostion.right), Math.abs(this.targetPostion.right - this.sourcePostion.left)) - 26
                    top = this.targetPostion.left > this.sourcePostion.left ? this.targetPostion.top : this.sourcePostion.top
                    left = this.targetPostion.left > this.sourcePostion.right ? this.sourcePostion.right : this.targetPostion.right
                    left += 12
                    break
                case 4:
                    left = Math.min(this.targetPostion.right, this.sourcePostion.right) + 14
                    width = Math.abs(this.targetPostion.right - this.sourcePostion.right)
                    // 谁差补谁
                    top = this.targetPostion.right > this.sourcePostion.right ? this.sourcePostion.top : this.targetPostion.top
                    break


            }

            return {
                left: left + 'px',
                top: top + this.dayBoxHeight / 2 - 1 + 'px',
                width: width + 'px'
            }
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
