<template>
    <div style="display: inline-block;">
        <col-button title="新增" type="primary" :size="size" icon="plus" @click="openAddDialog" />

        <el-dialog title="新增" :visible.sync="dialogVisible" :modal="false" :close-on-click-modal="false" width="50%">
            <el-form ref="form" :model="formData" label-width="80px">
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
                <col-button auto-loading title="确 定" type="primary" @click="handleAdd" />
            </span>
        </el-dialog>
    </div>
</template>
  
<script>
import colButton from '../../buttons/index.vue'
import contentItem from '../components/contentItem.vue'

export default {
    name: 'ButtonAdd',
    components: {
        colButton, contentItem
    },
    props: {
        store: {
            type: Object,
            required: true
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
    methods: {
        show() {
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
            if (!this.button.requestUrl) {
                this.$message.error('请配置requestUrl')
                done()
                return
            }
            const valid = await this.$refs.form.validate().catch(() => {
                done()
            })
            
            if (!valid) {
                this.$message.error('请检查表单')
                done()
                return
            }

            const params = this.formData
            const res = await this.store.request(this.button.requestUrl, {
                method: 'post',
                data: params
            }).catch(() => {
                this.$message.error('网络异常，请稍后重试')
                done()
            })

            if (res && res.code === 200) {
                this.$message.success(res.message || '新增成功')
                this.refresh()
                this.hide()
            } else if (res) {
                this.$message.error(res.message || '新增失败')
            }
            done()
        }
    }
}
</script>
  
<style scoped></style>
  