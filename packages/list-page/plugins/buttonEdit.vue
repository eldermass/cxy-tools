<template>
    <div style="display: inline-block;">
        <col-button title="修改" type="warning" :size="size" :disabled="!isSingleSelected" icon="edit"
            @click="openAddDialog" />

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
                <col-button title="取 消" @click="hide" />
                <col-button auto-loading title="确 定" type="primary" @click="handleUpdate" />
            </span>
        </el-dialog>
    </div>
</template>
  
<script>
import colButton from '../../buttons/index.vue'
import contentItem from '../components/contentItem.vue'
import { request } from '../helper'

export default {
    name: 'ColButton',
    components: {
        colButton, contentItem
    },
    props: {
        multipleSelection: {
            type: Array,
            default: () => []
        },
        currentRow: {
            type: Object,
            default: () => ({})
        },
        button: {
            type: Object,
            default: () => ({})
        },
        refresh: {
            type: Function,
            default: () => { }
        },
        size: {
            type: String,
            default: 'mini'
        }
    },
    data() {
        return {
            dialogVisible: false,
            formData: {}
        }
    },
    computed: {
        isSelected() {
            return this.multipleSelection.length > 0
        },
        isSingleSelected() {
            return this.multipleSelection.length === 1
        },
        isMultiSelected() {
            return this.multipleSelection.length > 1
        }
    },
    methods: {
        show() {
            this.dialogVisible = true
        },
        hide() {
            this.dialogVisible = false
        },
        openAddDialog() {
            this.formData = { ...this.currentRow }
            this.show()
        },
        async handleUpdate(done) {
            if (!this.button.requestUrl) {
                this.$message.error('请配置请求地址')
                done()
                return
            }

            const params = this.formData
            const res = await request.post(this.button.requestUrl, params).catch(() => {
                this.$message.error('网络异常，请稍后重试')
                done()
            })

            if (res && res.code === 200) {
                this.$message.success(res.message || '修改成功')
                this.refresh()
                this.hide()
            } else if (res) {
                this.$message.error(res.message || '修改失败')
            }
            done()
        }
    }
}
</script>
  
<style scoped></style>
  