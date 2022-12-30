<template>
    <div style="height: 100%">
        <date-list :store="store" />
        <div class="rows-container" ref="rowsContainer">
            <row-mask :store="store" />
        </div>
    </div>
</template>

<script>
import dateList from "./date-list.vue"
import rowMask from "./row-mask.vue"

export default {
    name: "right-pattern",
    components: { dateList, rowMask },
    props: {
        store: {
            required: true
        },
        datelist: {
            type: Array,
            default: () => [],
        },
        eventList: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            lastX: 0,
            lastY: 0,
            maxScrollWidth: 0,
            maxScrollHeight: 0,
        }
    },
    mounted() {
        this.addScrollListenner()
    },
    methods: {
        addScrollListenner() {
            this.$refs.rowsContainer.addEventListener("scroll", (e) => {
                const x = e.target.scrollLeft
                const y = e.target.scrollTop

                if (this.lastX !== x) {
                    // console.log("x change", x)
                    this.$refs.dateList.scrollTo(x, this.maxScrollWidth)
                    this.lastX = x
                }
                if (this.lastY !== y) {
                    // console.log("y change", y)
                    this.$emit("scrollY", y, this.maxScrollHeight)
                    this.lastY = y
                }

                if (!this.maxScrollWidth) {
                    this.maxScrollWidth = e.target.scrollWidth - e.target.clientWidth
                }

                if (!this.maxScrollHeight) {
                    this.maxScrollHeight = e.target.scrollHeight - e.target.clientHeight
                }
                // console.log(this.lastX, this.lastY, this.maxScrollHeight, this.maxScrollWidth)
            })
        },
        handleClick(data) {
            this.$emit("item-click", data)
        },
        handleItemDrop(index, from, to) {
            this.$emit("item-drop", index, from, to)
        },
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
