export default {
    data() {
        return {
            pages: {
                pageNum: 1,
                pageSize: 20,
                total: 50,
            },
        }
    },
    methods: {
        handleSizeChange(size) {
            this.pages.pageSize = size
            this.getList()
        },
        handleCurrentChange(current) {
            this.pages.pageNum = current
            this.getList()
        },
    },
}
