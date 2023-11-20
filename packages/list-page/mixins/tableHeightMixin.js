export default {
    data() {
        return {
            tableHeight: 100,
        }
    },
    methods: {
        // 初始化表格高度
        initTableHeight() {
            if (!this.$refs.table) {
                setTimeout(this.initTableHeight, 30)
                return
            }
            // 顶部 32+20+28+41＝121 底部 32 +10 = 42
            this.$nextTick(() => {
                // 顶部要减去的高度
                let topHeight = 162

                // 如果没有seqence列，减去序号列的高度
                if (!this.seqence.length) {
                    topHeight -= 31
                }

                const parentHeight = this.$refs.table.$el.parentNode.offsetHeight
                this.tableHeight = parentHeight - topHeight
                // console.log("高度：", this.tableHeight, window.innerHeight, this.$refs.table.$el.offsetTop)
                // this.$refs.table && this.$refs.table.doLayout()
            })
        },
    },
}
