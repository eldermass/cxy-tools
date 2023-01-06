<template>
    <div class="row-tasks-item" :style="itemStyle" @click.stop="handleClick">
        <div :class="['container', task.theme || 'default', is_selected ? 'selected' : '']"
            :style="{ paddingLeft: task.is_lock ? '20px' : '' }" @mousedown="handlePointMouseDown($event, 'container')">
            <div v-if="task.is_lock" class="icon-container">
                <i class="el-icon-lock icon-color"></i>
            </div>
            <span :title="task.text">
                {{ task.text }}
            </span>
        </div>
        <div v-if="is_selected && !task.is_lock" class="link-point point-left">
            <div class="point" @mousedown="handlePointMouseDown($event, 'left')"></div>
        </div>
        <div v-if="is_selected && !task.is_lock" class="link-point point-right">
            <div class="point" @mousedown="handlePointMouseDown($event, 'right')"></div>
        </div>
    </div>
</template>
<script>
import { mapStates } from '../../store/helper'
const dayjs = require('dayjs')

export default {
    name: "row-tasks-item",
    props: {
        store: {
            required: true
        },
        task: {
            type: Object,
            default: () => ({}),
        }
    },
    data() {
        return {
            last_click_time: 0,
            click_timer: null,
            pointMove: {
                startX: 0,
                startY: 0,
                offsetX: 0,
                offsetY: 0
            },
            isRightPointDown: false,
            isLeftPointDown: false,
            isContainerDown: false
        }
    },
    computed: {
        is_selected() {
            return this.task.is_selected
        },
        itemStyle() {
            const diffTime = dayjs(this.task.start_date).diff(this.nowTime)
            const timeOffset = (diffTime / 86400000).toFixed(2)
            // 拉拽调整
            let offsetWidth = this.isRightPointDown ? this.pointMove.offsetX : 0
            let offsetLeft = 0
            if (this.isLeftPointDown) {
                offsetWidth = -this.pointMove.offsetX
                offsetLeft = this.pointMove.offsetX
            }
            if (this.isContainerDown) {
                offsetLeft = this.pointMove.offsetX
            }

            return {
                width: this.task.duration * this.dayBoxWidth + offsetWidth + 'px',
                height: this.dayBoxHeight + 'px',
                lineHeight: this.dayBoxHeight * 0.8 + 'px',
                left: timeOffset * this.dayBoxWidth + offsetLeft + 'px',
                top: this.task.row_index * this.dayBoxHeight + 'px'
            }
        },
        ...mapStates({
            nowTime: 'nowTime',
            dayBoxHeight: 'dayBoxHeight',
            dayBoxWidth: 'dayBoxWidth'
        })
    },
    methods: {
        handleClick(e) {
            let now = Date.now()
            // 零点两秒内的连续点击应当被视为单机
            if (now - this.last_click_time > 200) {
                this.click_timer = setTimeout(() => {
                    this.handleSingleClick(e)
                }, 200)
                this.last_click_time = now
            } else {
                clearTimeout(this.click_timer)
                this.handleDbClick(e)
            }
        },
        handleSingleClick() {
            // console.log('click', e)
            this.store.setSelectedTask(this.task.task_id)
            // this.$nextTick(() => {
            //     const computedWatchers = this._computedWatchers
            //     if (computedWatchers) {
            //         Object.keys(computedWatchers).forEach((computed) => {
            //             computedWatchers[computed].update()
            //         })
            //     }
            //     this.$forceUpdate()
            // })
        },
        handleDbClick() {
            // console.log('db click', e)
        },
        // 处理拖拽
        handlePointMouseDown(e, type) {
            if (this.task.is_lock) return

            if (type === 'left') {
                this.isLeftPointDown = true
            } else if (type === 'right') {
                this.isRightPointDown = true
            } else if (type === 'container') {
                this.isContainerDown = true
            }

            this.pointMove.startX = e.clientX
            this.pointMove.startY = e.clientY
            this.pointMove.offsetX = 0
            this.pointMove.offsetY = 0
            document.onmousemove = this.fnMove.bind(this)
            document.onmouseup = this.fnStop.bind(this)
        },
        fnMove(e) {
            this.pointMove.offsetX = e.clientX - this.pointMove.startX
            this.pointMove.offsetY = e.clientY - this.pointMove.startY
            // console.log('offset: ', this.pointMove.offsetX, this.pointMove.offsetY)
            // document.addEventListener('mousemove', overArea, false)
        },
        fnStop() {
            // document.removeEventListener('mousemove', overArea, false)
            document.onmousemove = null
            document.onmouseup = null
            this.handleTaskChange()
        },
        handleTaskChange() {
            let newStartDate, newDuration
            // 拖拽主体
            if (this.isContainerDown) {
                const diffHours = this.pointMove.offsetX / this.dayBoxWidth * 24
                newStartDate = dayjs(this.task.start_date).add(diffHours, 'hour').format('YYYY-MM-DD HH:mm:ss')
            }
            // 拖拽左侧
            if (this.isLeftPointDown) {
                const diffDays = - this.pointMove.offsetX / this.dayBoxWidth
                newStartDate = dayjs(this.task.start_date).subtract(diffDays * 24, 'hour').format('YYYY-MM-DD HH:mm:ss')
                newDuration = this.task.duration + diffDays
                // console.log(dayjs(this.task.start_date).format('YYYY-MM-DD HH:mm:ss'), newStartDate)
            }
            // 拖拽右侧
            if (this.isRightPointDown) {
                const diffDays = this.pointMove.offsetX / this.dayBoxWidth
                newDuration = this.task.duration + diffDays
            }

            this.store.commit('updateTask', this.task.task_id, newStartDate, newDuration)
            this.$nextTick(() => {
                this.isLeftPointDown = false
                this.isRightPointDown = false
                this.isContainerDown = false
            })
        }
    }
}
</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}

.row-tasks-item {
    position: absolute;
    // border: 1px solid red;
    text-align: center;
    display: flex;
    align-items: center;

    .container {
        position: relative;
        width: 100%;
        height: 80%;
        padding: 0 0 0 10px;
        background: white;
        font-size: 13px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        user-select: none;

        .icon-container {
            position: absolute;
            left: 3px;
            top: 0;
            height: 100%;
        }
    }

    .link-point {
        position: absolute;
        top: 0;
        height: 100%;
        width: 20px;

        .point {
            cursor: pointer;
            box-sizing: border-box;
            position: relative;
            top: 50%;
            left: 2.5px;
            margin-top: -7.5px;
            vertical-align: middle;
            border: 1px solid #929292;
            border-radius: 6.5px;
            height: 13px;
            width: 13px;
            background-color: #f0f0f0;

            &:hover {
                background-color: #fff;
            }
        }

        &.point-left {
            left: -20px;
        }

        &.point-right {
            right: -20px;
        }
    }

    @each $type,
    $bordercolor,
    $backcolor in (default, #cb717b, #fbc3c4),
    ("green", #6bb42e, #d7eec0),
    ("purple", #7d78c8, #c5c5f9),
    ("blue", #afbfe4, #dfebf7),
    ("red", #eb3626, #fb9e99),
    ("cyan", #3498ff, #a6d7ff),
    ("yellow", #ffb300, #ffe9c2),
    ("orange", #db8000, #ffb35d),
    ("gray", #888888, #cccccc) {
        .#{$type} {
            border: 1px solid $bordercolor;
            background: $backcolor;

            .icon-color {
                color: $bordercolor;
            }

            &.selected {
                box-shadow: 0 0 5px $bordercolor;
            }
        }
    }
}
</style>
