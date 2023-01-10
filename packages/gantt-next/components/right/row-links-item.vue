<template>
    <div class="row-links-item">
        <div v-if="linkStep > 0" class="link-line" :style="sourceItemStyle"></div>
        <div v-if="linkStep > 0"
            :class="{ 'link-line': true, 'link-line-arrow-left': this.link.target_point === 'end', 'link-line-arrow-right': this.link.target_point === 'start' }"
            :style="targetItemStyle"></div>
        <!-- 一步连线 -->
        <div v-if="linkStep === 10" class="link-line" :style="oHorizontalLineStyle"></div>
        <!-- 两步连线 -->
        <div v-if="linkStep <= 4" class="link-line-vertical" :style="dVerticalLineStyle"></div>
        <div v-if="linkStep <= 4" class="link-line" :style="dHorizontalLineStyle"></div>
        <!-- 三步连线 -->
        <div v-if="linkStep === 5 || linkStep === 6" class="link-line-vertical" :style="tVerticalTopStyle"></div>
        <div v-if="linkStep === 5 || linkStep === 6" class="link-line" :style="tHorizontalLineStyle"></div>
        <div v-if="linkStep === 5 || linkStep === 6" class="link-line-vertical" :style="tVerticalBottomStyle"></div>
    </div>
</template>
<script>
import { mapStates } from "../../store/helper"
import dayjs from 'dayjs'

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
            // 1234 为2步连， 56为3步骤， 10为直连, 0 为错误不显示
            // 1-6的形状：C/反Z/Z/反C/S/反S
            // 前前
            let A = this.sourcePostion, B = this.targetPostion
            if (A.top === B.top) {
                return (this.link.source_point === 'end' && this.link.target_point === 'start') ? 10 : 0
            }

            if (this.link.source_point === 'start' && this.link.target_point === 'start') {
                // 只有一种链接方式，c字形
                return 1
            }
            // 前后
            else if (this.link.source_point === 'start' && this.link.target_point === 'end') {
                // 突出相交时
                if (Math.abs(A.left - B.right) < 27 && A.left > B.right) {
                    return A.top > B.top ? 6 : 5
                }
                if (B.top > A.top && B.right < A.left) {
                    return 2
                } else if (B.top > A.top && B.right > A.left) {
                    return 5
                } else if (A.top > B.top && A.left > B.right) {
                    return 3
                } else if (A.top > B.top && A.left < B.right) {
                    return 6
                }
            }
            // 后前
            else if (this.link.source_point === 'end' && this.link.target_point === 'start') {
                // 突出相交时
                if (Math.abs(A.right - B.left) < 27 && A.right < B.left) {
                    return A.top < B.top ? 6 : 5
                }

                if (B.top > A.top && B.left > A.right) {
                    return 3
                } else if (B.top > A.top && B.left < A.right) {
                    return 6
                } else if (A.top > B.top && A.right < B.left) {
                    return 2
                } else if (A.top > B.top && A.right > B.left) {
                    return 5
                }
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
        // 1步到达的连线
        oHorizontalLineStyle() {
            const width = Math.abs(this.targetPostion.left - this.sourcePostion.right)

            return {
                top: this.sourcePostion.top + this.dayBoxHeight / 2 - 1 + 'px',
                left: this.sourcePostion.right + 'px',
                width: width + 'px'
            }
        },
        // 2步到达的连线
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
        // 3步到达的连线
        tVerticalTopStyle() {
            let left = 0
            let top = Math.min(this.sourcePostion.top, this.targetPostion.top) + this.dayBoxHeight / 2
            if (this.linkStep === 5) {
                // a在下
                if (this.sourcePostion.top > this.targetPostion.top) {
                    left = this.targetPostion.left - 14
                } else {
                    left = this.sourcePostion.left - 14
                }
            } else if (this.linkStep === 6) {
                // a在下
                if (this.sourcePostion.top > this.targetPostion.top) {
                    left = this.targetPostion.right + 12
                } else {
                    left = this.sourcePostion.right + 12
                }
            }

            return {
                left: left + 'px',
                top: top + 'px',
                height: this.dayBoxHeight / 2 + 'px'
            }
        },
        tHorizontalLineStyle() {
            let left = 0, width = 0, A = this.sourcePostion, B = this.targetPostion
            let top = Math.min(A.top, B.top) + this.dayBoxHeight

            if (this.linkStep === 5) {
                if (A.top > B.top) {
                    let is_near_cross = Math.abs(A.right - B.left) < 28 && A.right < B.left
                    left = B.left - 14
                    width = is_near_cross ? 28 - Math.abs(A.right - B.left) : Math.abs(A.right - B.left) + 28
                } else {
                    let is_near_cross = Math.abs(A.left - B.right) < 28 && A.left > B.right
                    left = A.left - 14
                    width = is_near_cross ? 28 - Math.abs(A.left - B.right) : Math.abs(A.left - B.right) + 28
                }
            } else if (this.linkStep === 6) {
                if (A.top > B.top) {
                    let is_near_cross = Math.abs(A.left - B.right) < 28 && A.left > B.right
                    left = A.left - 14
                    width = is_near_cross ? 28 - Math.abs(A.left - B.right) : Math.abs(A.left - B.right) + 28
                } else {
                    let is_near_cross = Math.abs(A.right - B.left) < 28 && A.right < B.left
                    left = B.left - 14
                    width = is_near_cross ? 28 - Math.abs(A.right - B.left) : Math.abs(A.right - B.left) + 28
                }
            }

            return {
                left: left + 'px',
                top: top + 'px',
                width: width + 'px'
            }
        },
        tVerticalBottomStyle() {
            let left = 0
            let top = Math.min(this.sourcePostion.top, this.targetPostion.top) + this.dayBoxHeight
            let height = Math.abs(this.sourcePostion.top - this.targetPostion.top) - this.dayBoxHeight / 2

            if (this.linkStep === 5) {
                if (this.sourcePostion.top > this.targetPostion.top) {
                    left = this.sourcePostion.right + 12
                } else {
                    left = this.targetPostion.right + 12
                }
            } else if (this.linkStep === 6) {
                if (this.sourcePostion.top > this.targetPostion.top) {
                    left = this.sourcePostion.left - 14
                } else {
                    left = this.targetPostion.left - 14
                }
            }

            return {
                left: left + 'px',
                top: top + 'px',
                height: height + 'px'
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

    .link-line-arrow-left {
        position: relative;

        &::before {
            position: absolute;
            left: 0;
            top: 0;
            height: 0;
            width: 0;
            content: '';
            margin-left: -7px;
            margin-top: -5px;
            border-top: 6px solid transparent;
            border-left: 6px solid transparent;
            border-bottom: 6px solid transparent;
            border-right: 8px solid #ffa011;
        }
    }

    .link-line-arrow-right {
        position: relative;

        &::before {
            position: absolute;
            left: 0;
            top: 0;
            height: 0;
            width: 0;
            content: '';
            margin-left: 7px;
            margin-top: -5px;
            border-top: 6px solid transparent;
            border-right: 6px solid transparent;
            border-bottom: 6px solid transparent;
            border-left: 8px solid #ffa011;
        }
    }

    .link-line-vertical {
        position: absolute;
        height: 14px;
        width: 2px;
        background-color: #ffa011;
    }
}
</style>
