<template>
    <div class="list-page">
        <!-- 搜索部分 -->
        <search-panel ref="query" :param-list="queryParamList" :default-querys="defaultQuerys"
            @query="handleQuery" />
        <!-- 按钮部分 -->
        <el-row style="margin-bottom: 10px">
            <col-button title="新增" type="primary" icon="plus" />
            <col-button title="修改" type="warning" icon="edit" />
            <col-button title="删除" type="danger" />
        </el-row>
        <!-- 排序tag部分 -->
        <el-row v-if="seqence.length" style="margin: 10px 0">
            <el-tag v-for="(item, index) in seqence" :key="index" closable style="margin-right: 6px;" type="info"
                @close="handleSeqenceTagClose(index)">
                {{ item | filterSequence(seqenceOptions) }}
            </el-tag>
        </el-row>
        <!-- 表格部分 -->
        <el-table ref="table" v-loading="tableLoading" :data="tableData" element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading" :height="tableHeight" border @current-change="handleCurrentRowChange"
            @selection-change="handleSelectionChange">
            <el-table-column align="center" type="selection" width="50" />
            <el-table-column align="center" label="序号" type="index" width="100" />
            <el-table-column align="center" label="订单号" prop="id" width="150" />
            <el-table-column align="center" label="产品名称" prop="name" width="280" />
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
import searchPanel from './search-panel/index.vue'
import selectMixins from './mixins/selectRowMixin'
import tableHeightMixin from './mixins/tableHeightMixin'
import seqenceMixin from './mixins/seqenceMixin'
import pageMixin from './mixins/pageMixin'

export default {
    name: 'list-page',
    mixins: [selectMixins, tableHeightMixin, seqenceMixin, pageMixin],
    components: {
        searchPanel, colButton
    },
    data() {
        return {
            tableLoading: false,
            tableData: [{ id: 1, name: 'hello' }, { id: 2, name: 'world' }],
            queryParamList: [
                {
                    prop: 'orderWorkNo',
                    label: '工单编号',
                    type: 'input',
                    placeholder: '请输入工单编号'
                },
                {
                    prop: 'orderWorkNo2',
                    label: '工单编号2',
                    type: 'input',
                    placeholder: '请输入工单编号'
                },
                {
                    prop: 'orderWorkNo3',
                    label: '工单编号2',
                    type: 'input',
                    placeholder: '请输入工单编号'
                },
                {
                    prop: 'orderWorkNo4',
                    label: '工单编号2',
                    type: 'input',
                    placeholder: '请输入工单编号'
                },
                {
                    prop: 'orderWorkNo5',
                    label: '工单编号2',
                    type: 'input',
                    placeholder: '请输入工单编号'
                }
            ],
            defaultQuerys: ['orderWorkNo', 'orderWorkNo2', 'orderWorkNo3', ],
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
        handleQuery() {
            console.log('handleQuery')
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