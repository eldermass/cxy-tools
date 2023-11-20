export default {
    data() {
        return {
            states: {
                // 搜索数据
                search: {
                    queryParams: {}, // 搜索数据 { key: value }
                    queryOptionsList: [], // 搜索选项 [{}]
                    defaultOptons: [], // 默认搜索数据 [string]
                },
            },
        }
    },

    methods: {
        updateSearchParams(params) {
            this.states.search.queryParams = params
        },
    },
}
