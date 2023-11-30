<template>
    <div style="display: inline-block;">
        <col-button title="新增" type="primary" icon="plus" @click="openAddDialog" />

        <el-dialog title="新增" :visible.sync="dialogVisible" :modal="false" :close-on-click-modal="false" width="50%">
            <el-form :model="formData" label-width="80px">
                <template v-for="(column, index) in button.columns">
                    <el-form-item :label="column.label" :prop="column.prop" :rules="column.rules" :key="index">
                        <content-item :schema="column" :row="formData" />
                    </el-form-item>
                </template>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="hide">取 消</el-button>
                <el-button type="primary" @click="handleAdd">确 定</el-button> -->
                <col-button auto-loading title="取 消" @click="hide" />
                <col-button auto-loading title="确 定" type="primary" @click="handleAdd" />
            </span>
        </el-dialog>
    </div>
</template>
  
<script>
import colButton from '../../buttons/index.vue'
import contentItem from '../components/contentItem.vue'
import { request } from '../helper'

export default {
    name: 'ButtonAdd',
    components: {
        colButton, contentItem
    },
    props: {
        button: {
            type: Object,
            default: () => ({})
        },
        refresh: {
            type: Function,
            default: () => { }
        },
    },
    data() {
        return {
            dialogVisible: false,
            formData: {}
        }
    },
    methods: {
        show() {
            console.log('1. 调整页面样式，2. 将 common-item 封装一个新的到这里');
            this.dialogVisible = true
        },
        hide() {
            this.dialogVisible = false
        },
        openAddDialog() {
            this.formData = {}
            this.show()
        },
        async handleAdd(done) {
            const params = this.formData
            const res = await request.post(this.button.requestUrl, params).catch(() => {
                this.$message.error('网络异常，请稍后重试')
                done()
            })

            if (res && res.code === 200) {
                this.$message.success(res.message || '新增成功')
                this.refresh()
                this.hide()
            } else {
                this.$message.error(res.message || '新增失败')
            }
            done()
        }
    }
}
</script>
  
<style scoped></style>
  