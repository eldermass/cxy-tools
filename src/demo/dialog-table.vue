<template>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
        <template>
            <el-table :data="tableData" style="width: 100%" @row-dblclick="handleDbClick">
                <el-table-column prop="date" label="日期" width="180">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
            </el-table>
        </template>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return {
            dialogVisible: false,
            resolve: null,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }]
        }
    },
    methods: {
        show(resolve, url) {
            console.log(`请求 ${url} 获取数据`)
            this.dialogVisible = true
            this.resolve = resolve
        },
        hide() {
            this.dialogVisible = false
            this.resolve = null
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(() => {
                    done()
                })
                .catch(() => { })
        },
        handleDbClick(row) {
            this.resolve(row)
            this.hide()
        }
    }
}
</script>