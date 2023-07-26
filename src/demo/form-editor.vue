<template>
    <div class="demo-form-editor">
        <var-form-editor ref="formEditor" :plugins-schema="mockPluginSchema" />
        <el-button @click="getFormSchema">页面结构</el-button>
        <el-button @click="getTypeData">数据结构</el-button>
    </div>
</template>

<script>
const mockPluginSchema = [{ "id": 2, "name": "输入框", "plugin": "form-item", "construct": { "plugin": "form-item", "type": "input", "label": "文本", "prop": "propInput", "defaultValue": "", "placeholder": "请输入", "disabled": false } }, { "id": 5, "name": "下拉框", "plugin": "form-item", "construct": { "plugin": "form-item", "type": "select", "label": "选择", "prop": "propSelect", "defaultValue": "", "placeholder": "请选择", "disabled": false, "multiple": true, "optionSource": "", "options": [{ "label": "选项1", "value": "1" }, { "label": "选项2", "value": "2" }] } }, { "id": 11, "name": "表格", "plugin": "table", "construct": { "plugin": "table", "type": "input", "prop": "propTable", "apiSource": "", "refreshSource": "", "border": true, "defaultValue": [], "tableHeaders": [{ "label": "名称", "prop": "name", "width": "150", "align": "center", "type": "text" }, { "label": "地点", "prop": "address", "type": "select", "defaultValue": "", "placeholder": "请选择", "disabled": false, "multiple": true, "width": "150", "align": "center", "optionSource": "" }, { "label": "状态", "prop": "status", "type": "switch" }, { "label": "国家", "prop": "country", "type": "checkbox", "options": [{ "label": "中国", "value": "1" }, { "label": "俄罗斯", "value": "2" }] }] } }]

export default {
    name: 'demo-form-edito',
    data() {
        return {
            mockPluginSchema
        }
    },
    methods: {
        getTypeData() {
            console.log(this.$refs.formEditor.getTypeData())
        },
        getFormSchema() {
            console.log(this.$refs.formEditor.getFormSchema())
        }
    },
}

</script>
<style lang="scss" scoped>
.demo-form-editor {
    height: 100%;
}
</style>
