<template>
    <div class="list-page">
        <!-- 搜索部分 -->
        <search-panel :param-list="queryParamList" :default-querys="defaultQuerys" @query="handleQuery" />
        <!-- 按钮部分 -->
        <el-row style="margin-bottom: 10px">
            <col-button v-if="buttonList.includes('add')" title="新增" type="primary" icon="plus"
                :disabled="!isSingleSelected" @click="handleAdd" />
            <col-button v-if="buttonList.includes('edit')" title="修改" type="warning" icon="edit"
                :disabled="!isSingleSelected" @click="handleEdit" />
            <col-button v-if="buttonList.includes('delete')" title="删除" type="danger" :disabled="!isSelected"
                @click="handleDelete" />
            <slot name="buttons" v-bind:currentRow="currentRow" v-bind:multipleSelection="multipleSelection"></slot>
            <!-- 自定义按钮 -->
        </el-row>
        <!-- 排序tag部分 -->
        <el-row v-if="seqence.length" style="margin: 10px 0">
            <el-tag v-for="(item, index) in seqence" :key="index" size="mini" closable style="margin-right: 6px;" type="info"
                @close="handleSeqenceTagClose(index)">
                {{ item | filterSequence(seqenceOptions) }}
            </el-tag>
        </el-row>
        <!-- 表格部分 -->
        <el-table ref="table" v-loading="tableLoading" :data="tableData" element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading" :height="tableHeight" border @current-change="handleCurrentRowChange"
            @selection-change="handleSelectionChange" @sort-change="handleSortChange">
            <el-table-column align="center" type="selection" width="50" />
            <el-table-column align="center" label="序号" type="index" width="100" />
            <el-table-column v-for="(item, index) in tableColumns" :key="index" :align="item.align" :label="item.title"
                :min-width="item.width" :prop="item.prop" :show-overflow-tooltip="item.show_overflow_tooltip"
                :sortable="item.sortable" header-align="center" />
        </el-table>
        <!-- 分页部分 -->
        <div>
            <el-pagination style="margin-top: 10px" :current-page="pages.pageNum"
                :page-sizes="[10, 20, 50, 100, 200, 500, 1000]" :page-size="pages.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="pages.total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script>
import colButton from '../buttons/index.vue'
import searchPanel from '../search-panel/index.vue'
import selectMixins from './mixins/selectRowMixin'
import tableHeightMixin from './mixins/tableHeightMixin'
import seqenceMixin from './mixins/seqenceMixin'
import pageMixin from './mixins/pageMixin'
import { createStore } from './store/helper'
import { pageData } from './mock'

export default {
    name: 'list-page',
    mixins: [selectMixins, tableHeightMixin, seqenceMixin, pageMixin],
    components: {
        searchPanel, colButton
    },
    data() {
        this.store = createStore(this, {
            search: {
                queryParams: {}, // 搜索数据 { key: value }
                queryOptionsList: pageData.search.queryOptions, // 搜索选项 [{}]
                defaultOptons: pageData.search.defaultQuerys, // 默认搜索数据 [string]
            },
        })
        return {
            tableLoading: false,
            tableData: pageData.table.tableData,
            defaultQuerys: pageData.search.defaultQuerys,
            queryParamList: pageData.search.queryOptions,
            buttonList: pageData.buttons, // 按钮
            tableColumns: pageData.table.columns, // 表格列
        }
    },
    mounted() {
        this.initData()
        this.initTableHeight()
    },
    methods: {
        initData() {
            console.log('initData')
        },
        getList() {
            console.log(this.pages)
            console.log('getList')
        },
        refresh() {
            console.log('refresh 刷新数据')
        },
        handleQuery(queryParams) {
            console.log('handleQuery', queryParams)
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
}
</style>./mixins/selectRowMixin