export default {
    data() {
        return {
            seqence: [], // 排序字段 [{ prop: "create_time", order: "descending" }]
        }
    },
    computed: {
        // seqenceOptions: [], // 排序选项 [{ title: "按创建时间", prop: "create_time" }]
        seqenceOptions() {
            return this.table.columns.map((item) => {
                return {
                    title: item.title,
                    prop: item.prop,
                }
            })
        },
    },
    filters: {
        filterSequence(item, options) {
            const fix = item.order === "descending" ? "降序" : "升序"
            const find = options.find((item) => item.prop === item.prop)

            return find ? find.title + " " + fix : item.prop
        },
    },
    watch: {
        seqence(sq) {
            this.store.updateSorts(sq)
            this.refresh()
        }
    },
    methods: {
        // 排序变化
        handleSortChange(sort) {
            delete sort.column
            const find = this.seqence.find((item) => item.prop === sort.prop)
            // 如果已有
            if (find) {
                if (!sort.order) {
                    this.seqence.splice(this.seqence.indexOf(find), 1)
                } else {
                    find.order = sort.order
                }
            }
            // 如果没有
            if (!find) {
                this.seqence.push(sort)
            }

            // console.log("handleSortChange", sort) // { column, prop, order: string | null }
            // 当排序变化时，重置表格高度
            this.initTableHeight()
        },
        handleSeqenceTagClose(index) {
            this.seqence.splice(index, 1)
            this.$nextTick(() => {
                this.initTableHeight()
            })
        },
    },
}
