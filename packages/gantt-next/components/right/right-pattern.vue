<template>
    <div style="height: 100%; border-left: 1px solid #ccc" @click="handleEmptyClick">
        <date-list :store="store" ref="dateList" />
        <div class="rows-container" ref="rowsContainer" @scroll="handleScroll" @mousewheel.stop="handleMouseWheel">
            <div class="content-panel" :style="totalLengthStyle" @mousedown="handlePanelMouseDown"
                @contextmenu.prevent="handleContextmenu">
                <row-mask :store="store" />
                <row-tasks :store="store" />
                <row-links :store="store" />
                <assist-line :store="store" />
            </div>
        </div>
        <right-menu :class-index="0" :rightclickInfo="rightclickInfo" :on-right-menu-click="onRightMenuClick" />
    </div>
</template>

<script>
import dateList from "./date-list.vue"
import rowMask from "./row-mask.vue"
import rowTasks from './row-tasks.vue'
import rowLinks from './row-links.vue'
import assistLine from './assistLine.vue'
import { mapStates } from "../../store/helper"
import rightMenu from '../right-menu.vue'

export default {
    name: "right-pattern",
    components: { dateList, rowMask, rowTasks, rowLinks, assistLine, rightMenu },
    props: {
        store: {
            required: true
        },
        onRightMenuClick: {
            type: Function
        }
    },
    data() {
        return {
            lastX: 0,
            lastY: 0,
            maxScrollWidth: 0,
            maxScrollHeight: 0,
            pointMove: {},
            rightclickInfo: {}
        }
    },
    computed: {
        ...mapStates({
            totalLengthStyle: (state) => ({
                width: state.daysList.length * state.dayBoxWidth + 'px',
                height: state.rows.length * state.dayBoxHeight + 'px'
            }),
            dayBoxWidth: 'dayBoxWidth',
            rightMenulists: 'rightMenulists'
        })
    },
    mounted() {
    },
    methods: {
        handleScroll(e) {
            const x = e.target.scrollLeft
            const y = e.target.scrollTop

            // x 轴滚动
            if (this.lastX !== x) {
                // console.log("x change", x)
                this.$refs.dateList.scrollTo(x, this.maxScrollWidth)
                this.lastX = x
            }
            // y 轴滚动
            if (this.lastY !== y) {
                // console.log("y change", y)
                this.store.commit('setScrollY', y, this.maxScrollHeight)
                this.lastY = y
            }

            if (!this.maxScrollWidth) {
                this.maxScrollWidth = e.target.scrollWidth - e.target.clientWidth
            }

            if (!this.maxScrollHeight) {
                this.maxScrollHeight = e.target.scrollHeight - e.target.clientHeight
            }
            // console.log(this.lastX, this.lastY, this.maxScrollHeight, this.maxScrollWidth)
        },
        handleMouseWheel(e) {
            if ((e.wheelDelta && e.altKey) || e.detail) {
                e.preventDefault()
                const detail = e.detail || e.wheelDelta
                let left = this.$refs.rowsContainer.scrollLeft

                if (detail > 0) {
                    left -= 50
                } else {
                    left += 50
                }
                this.$refs.rowsContainer.scrollTo(left < 0 ? 0 : left, 0)
            }

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
        handleEmptyClick() {
            this.store.setSelectedTask()
        },
        handlePanelMouseDown(e) {
            this.pointMove.startX = e.clientX + this.$refs.rowsContainer.scrollLeft
            this.pointMove.startY = e.clientY + this.$refs.rowsContainer.scrollTop
            this.pointMove.offsetX = 0
            this.pointMove.offsetY = 0
            // console.log(this.pointMove)

            document.onmousemove = this.fnMove.bind(this)
            document.onmouseup = this.fnStop.bind(this)
        },
        fnMove(e) {
            this.pointMove.offsetX = e.clientX - this.pointMove.startX
            this.pointMove.offsetY = e.clientY - this.pointMove.startY
            const offset = Math.min(-this.pointMove.offsetX, this.maxScrollWidth || 1)

            this.$refs.dateList.scrollTo(offset, this.maxScrollWidth)
            this.$refs.rowsContainer.scrollTo(offset, 0)
        },
        fnStop() {
            document.onmousemove = null
            document.onmouseup = null
        },
        handleContextmenu(event) {
            const menulists = this.rightMenulists.concat([{
                fnName: "setting",
                params: {},
                icoName: "el-icon-setting",
                btnName: "设 置",
                // divided: true,
                // disabled: true,
                // children: [],
            }])
            
            this.rightclickInfo = {
                position: {
                    x: event.clientX,
                    y: event.clientY,
                },
                menulists,
            };
        }
    },
}
</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}

.rows-container {
    // height: 400px;
    height: calc(100% - 60px);
    overflow: scroll;
    user-select: none;

    .content-panel {
        position: relative;
        overflow: hidden;
    }
}

/*定义整个滚动条高宽及背景：高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
    width: 7px;
    height: 7px;
    background-color: #f5f5f5;
}

/*定义滚动条轨道：内阴影+圆角*/
::-webkit-scrollbar-track {
    background-color: #f5f5f5;
    box-shadow: none;
    border-radius: 2px;
}

/*定义滑块：内阴影+圆角*/
::-webkit-scrollbar-thumb {
    border-radius: 2px;
    outline: none;
    background-color: #9b9b9b;
}
</style>
