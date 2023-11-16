export default {
    data() {
        return {
            seqence: [],
            // seqence: ['d'],
            seqenceOptions: [],
        }
    },
    filters: {
        filterSequence(value, options) {
            const find = options.find((item) => item.value === value)
            return find ? find.label : value
        },
    },
    methods: {
        handleSeqenceTagClose(index) {
            this.seqence.splice(index, 1)
            this.$nextTick(() => {
                this.initTableHeight()
            })
        },
    },
}
