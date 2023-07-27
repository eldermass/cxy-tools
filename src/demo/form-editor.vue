<template>
    <div class="demo-form-editor">
        <var-form-editor ref="formEditor" :form-schema="mockFormSchema" />
        <el-button @click="getFormSchema">页面结构</el-button>
        <el-button @click="getTypeData">数据结构</el-button>
        <el-button @click="getFormData">默认数据</el-button>
    </div>
</template>

<script>
const mockFormSchema = [{ "plugin": "validate-rules", "rules": "{\"propInput\":[{\"required\":true,\"message\":\"请输入活动名称\",\"trigger\":\"blur\"},{\"min\":3,\"max\":5,\"message\":\"长度在 3 到 5 个字符\",\"trigger\":\"blur\"}]}" }, { "plugin": "form-item", "type": "input", "label": "文本", "prop": "propInput", "defaultValue": "", "placeholder": "请输入", "disabled": false, "hide": false }, { "plugin": "form-item", "type": "select", "label": "选择", "prop": "propSelect", "defaultValue": "", "placeholder": "请选择", "disabled": false, "multiple": true, "optionSource": "", "options": [{ "label": "选项1", "value": "1" }, { "label": "选项22", "value": "2" }] }, { "plugin": "table", "type": "input", "prop": "propTable", "apiSource": "", "refreshSource": "", "border": true, "defaultValue": [], "tableHeaders": [{ "label": "名称", "prop": "name", "width": "150", "align": "center", "type": "input" }, { "label": "地点", "prop": "address", "type": "select", "defaultValue": "", "placeholder": "请选择", "disabled": false, "multiple": true, "width": "150", "align": "center", "optionSource": "" }, { "label": "状态", "prop": "status", "type": "switch" }, { "label": "验证状态", "prop": "valid_status", "hide": true, "type": "input","defaultValue": `(prop, value, row) => {
                console.log("valid_name: ", prop, value, row)
                return value === "上海市普陀区金沙江路 1518 弄"
            }` }, { "label": "国家", "prop": "country", "type": "checkbox", "options": [{ "label": "中国", "value": "1" }, { "label": "俄罗斯", "value": "2" }] }] }]

export default {
    name: 'demo-form-edito',
    data() {
        return {
            mockFormSchema
        }
    },
    methods: {
        getFormData() {
            console.log(this.$refs.formEditor.getFormData())
        },
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
