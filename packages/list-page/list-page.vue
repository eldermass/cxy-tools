<template>
    <div class="list-page">
        <!-- 搜索部分 -->
        <search-panel :param-list="search.queryOptions" :default-querys="search.defaultQuerys" @query="handleQuery" />
        <!-- 按钮部分 -->
        <el-row class="buttons">
            <col-button style="margin-left: 10px;" v-if="buttonList.includes('add')" title="新增" type="primary" icon="plus"
                :disabled="!isSingleSelected" @click="handleAdd" />
            <col-button v-if="buttonList.includes('edit')" title="修改" type="warning" icon="edit"
                :disabled="!isSingleSelected" @click="handleEdit" />
            <col-button v-if="buttonList.includes('delete')" title="删除" type="danger" :disabled="!isSelected"
                @click="handleDelete" />
            <!-- 自定义按钮 -->
            <slot name="buttons" v-bind:currentRow="currentRow" v-bind:multipleSelection="multipleSelection"></slot>

            <!-- 列编辑 -->
            <div class="column-edit">
                <column-edit :columns="table.columns" @save="onColumnChange" />
            </div>
        </el-row>
        <!-- 排序tag部分 -->
        <el-row v-if="seqence.length" style="margin: 10px 0">
            <el-tag v-for="(item, index) in seqence" :key="index" size="mini" closable style="margin-right: 6px;"
                type="info" @close="handleSeqenceTagClose(index)">
                {{ item | filterSequence(seqenceOptions) }}
            </el-tag>
        </el-row>
        <!-- 表格部分 -->
        <el-table ref="table" v-loading="tableLoading" :data="table.tableData" element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading" :height="tableHeight" border @current-change="handleCurrentRowChange"
            @selection-change="handleSelectionChange" @sort-change="handleSortChange">
            <el-table-column align="center" type="selection" width="50" />
            <el-table-column align="center" label="序号" type="index" width="100" />
            <el-table-column v-for="(item, index) in table.columns" :key="index" :align="item.align" :label="item.title"
                :min-width="item.width" :prop="item.prop" :show-overflow-tooltip="item.show_overflow_tooltip || true"
                :sortable="item.sortable" header-align="center" />
        </el-table>
        <!-- 分页部分 -->
        <div>
            <el-pagination style="margin-top: 10px" :current-page="pages.pageNum" :page-sizes="pages.pageSizeOpts"
                :page-size="pages.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pages.total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script>
import colButton from '../buttons/index.vue'
import searchPanel from '../search-panel/index.vue'
import columnEdit from './components/columnEdit.vue'

import selectMixins from './mixins/selectRowMixin'
import tableHeightMixin from './mixins/tableHeightMixin'
import seqenceMixin from './mixins/seqenceMixin'
import pageMixin from './mixins/pageMixin'
import { createStore, mapStates } from './store/helper'

export default {
    name: 'list-page',
    mixins: [selectMixins, tableHeightMixin, seqenceMixin, pageMixin],
    components: {
        searchPanel, colButton, columnEdit
    },
    props: {
        pageData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        this.store = createStore(this, {})

        return {
            tableLoading: false,
            buttonList: this.pageData.buttons, // 按钮
        }
    },
    computed: {
        ...mapStates({
            search: 'search',
            pages: 'pages',
            sorts: 'sorts',
            table: 'table'
        })
    },
    created() {
        this.initScheme()
    },
    mounted() {
        this.initData()
        this.initTableHeight()
    },
    methods: {
        // 初始化结构
        initScheme() {
            this.store.commit('initScheme', {
                search: this.pageData.search,
                pages: this.pageData.pages,
                table: this.pageData.table,
            })
            // console.log('initScheme', this.store)
        },
        initData() {
            // 如果有tabledata，直接赋值
            if (this.pageData.table.tableData) {
                this.store.updateTableData(this.pageData.table.tableData)
            } else {
                this.getList()
            }
        },
        async getList() {
            console.group('getList 参数')
            console.log('search', this.search)
            console.log('pages', this.pages)
            console.log('sorts', this.sorts)
            console.groupEnd()

            this.tableLoading = true
            // 将请求方法从外部传入更好
            const res = await fetch(this.pageData.table.requestUrl).then(res => res.json())
            this.tableLoading = false

            this.store.updateTableData(res)
        },
        refresh() {
            console.log('refresh 刷新数据')
            this.getList()
        },
        onColumnChange(columnList) {
            console.log('onColumnChange', columnList)
            this.store.updateTableColumns(columnList)
        },
        handleQuery(queryParams) {
            this.store.updateQueryParams(queryParams)
            this.refresh()
        },
        handleAdd() {
            console.log('handleAdd')
        },
        handleEdit() {
            console.log('handleEdit')
        },
        handleDelete() {
            console.log('handleDelete')
        },
    },
}
</script>

<style scoped lang="scss">
.list-page {
    height: 100%;
    width: 100%;
    text-align: left;

    .buttons {
        margin-bottom: 10px;
        padding-right: 60px;
        line-height: 34px;
    }

    .column-edit {
        position: absolute;
        right: 5px;
        top: 0;
        z-index: 100;
    }
}
</style>