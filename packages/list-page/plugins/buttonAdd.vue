<template>
    <div style="display: inline-block;">
        <col-button title="新增" type="primary" icon="plus" @click="handleAdd" />

        <el-dialog title="新增" :visible.sync="dialogVisible" :modal="false" :close-on-click-modal="false" width="30%">
            <el-form :model="formData" label-width="80px">
                <template v-for="(column, index) in button.columns">
                    <el-form-item :label="column.label" :prop="column.prop" :rules="column.rules" :key="index">
                        <content-item :schema="column" :row="formData" />
                    </el-form-item>
                </template>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="hide">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
        handleAdd() {
            console.log('handleAdd', this.button)
            this.show()
        }
    }
}
</script>
  
<style scoped></style>
  