<template>
    <div class="demo-container">
        <list-page ref="page" :page-data="pageData">
            <template v-slot:buttons="scope">
                <el-button size="mini" @click="handleBtnClick(scope)">自定义按钮</el-button>
                <el-button size="mini" @click="handleBtnClick(scope)">自定义按钮</el-button>
                <el-button size="mini" @click="handleBtnClick(scope)">自定义按钮</el-button>
                <el-button size="mini" @click="handleBtnClick(scope)">自定义按钮</el-button>
                <el-button size="mini" @click="handleBtnClick(scope)">自定义按钮</el-button>
                <el-button size="mini" @click="handleBtnClick(scope)">自定义按钮</el-button>
                <el-button size="mini" @click="handleBtnClick(scope)">自定义按钮</el-button>
                <el-button size="mini" @click="handleBtnClick(scope)">自定义按钮</el-button>
                <el-button size="mini" @click="handleBtnClick(scope)">自定义按钮</el-button>
                <el-button size="mini" @click="handleBtnClick(scope)">自定义按钮</el-button>
                <el-button size="mini" @click="handleBtnClick(scope)">自定义按钮</el-button>
                <el-button size="mini" @click="handleBtnClick(scope)">自定义按钮</el-button>
                <el-button size="mini" @click="handleBtnClick(scope)">自定义按钮</el-button>
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