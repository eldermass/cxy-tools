<template>
    <div class="demo-container">
        <list-page ref="page" :page-data="pageData">
            <template #slottest="{ searchList, setQuerys }">
                <el-button size="mini" @click="changeSearch(searchList, setQuerys)">改变条件</el-button>
            </template>
            <template #buttons="{ currentRow, multipleSelection, isSelected, isSingleSelected, isMultiSelected }">
                <el-button size="mini" @click="handleBtnClick({ currentRow, multipleSelection })">刷新表格</el-button>
                <el-button :disabled="!currentRow" size="mini" @click="updateTableData">更新数据</el-button>
                <el-button :disabled="!isSelected" size="mini">选中</el-button>
                <el-button :disabled="!isSingleSelected" size="mini">单选</el-button>
                <el-button :disabled="!isMultiSelected" size="mini">多选</el-button>
            </template>
        </list-page>
    </div>
</template>
<script>
import { pageData } from '../../packages/list-page/mock'

export default {
    name: 'demo-list-page',
    data() {
        return {
            pageData: pageData
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
        }
    }
}

</script>

<style scoped lang="scss">
.demo-container {
    height: 80%;
    width: 80%;
    border: 1px solid skyblue;
}
</style>