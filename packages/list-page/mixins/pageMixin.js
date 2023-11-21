export default {
    data() {
        return {
            // pages: {
            //     pageNum: 1,
            //     pageSize: 20,
            //     total: 50,
            // },
        }
    },
    methods: {
        handleSizeChange(size) {
            this.store.updatePageSize(size)
            this.refresh()
        },
        handleCurrentChange(current) {
            this.store.updatePageNum(current)
            this.refresh()
        },
    },
}
