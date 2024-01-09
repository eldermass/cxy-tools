<template>
    <div class="demo-container">
        <list-page ref="page" :page-data="pageData" @query="handleQuery" :request-func="request">
            <template #slottest="{ searchList, setQuerys }">
                <el-button size="mini" @click="changeSearch(searchList, setQuerys)">改变条件</el-button>
            </template>
            <template #imageSlot="{ row, index }">
                <img :src="row.image" height="50" width="50" :key="index" />
            </template>
            <template #buttons="{ currentRow, multipleSelection, isSelected, isSingleSelected, isMultiSelected }">
                <el-button size="mini" @click="handleBtnClick({ currentRow, multipleSelection })">刷新表格</el-button>
                <el-button :disabled="!currentRow" size="mini" @click="updateTableData">更新数据</el-button>
                <el-button :disabled="!isSelected" size="mini">选中</el-button>
                <el-button :disabled="!isSingleSelected" size="mini">单选</el-button>
                <el-button :disabled="!isMultiSelected" size="mini">多选</el-button>
                <el-button @click="getListData" size="mini">获取页面数据</el-button>
            </template>
        </list-page>
    </div>
</template>
<script>
import { pageData } from '../../packages/list-page/mock'
// 外部传入请求方法，非必须
import { request } from '../../packages/list-page/helper'

import { listPage } from '../index'
import testText from './components/test-text.vue'
console.log('regiester plugins: ', listPage.registerPlugins(testText))

export default {
    name: 'demo-list-page',
    data() {
        return {
            pageData: pageData,
            request
        }
    },
    methods: {
        handleBtnClick(scope) {
            console.log('自定义按钮收到数据', scope)
            this.$refs.page.refresh()
        },
        changeSearch(searchList, setQuerys) {
            setQuerys('test2', '改变后的值')
            this.$refs.page.runSearch()
        },
        // 外部更新表格数据
        updateTableData() {
            this.$refs.page.updateTableData([{ id: 6, name: '更新后的数据' }])
        },
        getListData() {
            const data = this.$refs.page.getListData()
            console.log('获取页面数据', data)
        },
        handleQuery(querys) {
            console.log('查询:', querys)
        }
    }
}

</script>

<style scoped lang="scss">
.demo-container {
    height: 90%;
    width: 100%;
    border: 1px solid skyblue;
}
</style>