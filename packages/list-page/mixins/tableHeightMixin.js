import _ from "lodash"

export default {
    data() {
        return {
            tableHeight: 100,
        }
    },
    mounted() {
        // 监听窗口变化
        window.addEventListener("resize", _.debounce(this.watchWindowHeight, 200))
    },
    methods: {
        watchWindowHeight() {
            this.initTableHeight()
        },
        // 初始化表格高度
        initTableHeight() {
            if (!this.$refs.table) {
                setTimeout(this.initTableHeight, 30)
                return
            }
            // 顶部 32+20+28+41＝121 底部 32 +10 = 42
            this.$nextTick(() => {
                const offsetTop = this.$refs.table.$el.offsetTop
                const parentTtop = this.$refs.table.$el.parentNode.offsetTop
                const parentHeight = this.$refs.table.$el.parentNode.offsetHeight

                // 距离父元素顶部的距离
                const offsetParentTop = offsetTop - parentTtop

                // 表格高度 = 父元素高度 - 距离父元素顶部的距离 - 底部分页高度
                this.tableHeight = parentHeight - offsetParentTop - 50
            })
        },
    },
}
