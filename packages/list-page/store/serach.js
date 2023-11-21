import _ from 'lodash'

export default {
    data() {
        return {
            states: {
                // 搜索数据
                search: {
                    queryParams: {}, // 搜索数据 { key: value } ***
                    queryOptions: [], // 搜索选项 [{}]
                    defaultOptons: [], // 默认搜索数据 [string]
                },
                pages: {
                    pageNum: 1, // 当前页码 ***
                    pageSize: 20, // 每页条数 ***
                    total: 50,
                    pageSizeOpts: [10, 20, 50, 100, 200], // 每页条数选项
                },
                sorts: [], // 排序数据 
                table: {
                    tableData: [], // 表格数据, 如果有该值，首次将不请求
                    columns: [], // 表格列数据
                }
            },
        }
    },

    methods: {
        // 更新搜索数据
        updateQueryParams(params) {
            this.states.search.queryParams = _.cloneDeep(params)
        },
        // 分页
        updatePageSize(size) {
            this.states.pages.pageSize = size
        },
        updatePageNum(num) {
            this.states.pages.pageNum = num
        },
        /**
        * 更新排序
        * @param {[{ prop: "create_time", order: "descending" }]} sorts 排序列表
        */
        updateSorts(sorts) {
            this.states.sorts = _.cloneDeep(sorts)
        },
        // 更新表格数据
        updateTableData(data) {
            this.states.table.tableData = _.cloneDeep(data)
        },
        // 更新表格列数据
        updateTableColumns(columns) {
            this.states.table.columns = _.cloneDeep(columns)
        }
    },
}
