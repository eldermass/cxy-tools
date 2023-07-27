<template>
    <div class="demo-form-editor">
        <var-form-editor ref="formEditor" :form-schema="mockFormSchema" />
        <el-button @click="getFormSchema">页面结构</el-button>
        <el-button @click="getTypeData">数据结构</el-button>
        <el-button @click="getFormData">默认数据</el-button>
    </div>
</template>

<script>
const mockFormSchema = [
    {
        plugin: "validate-rules", // validate-rules form-item table button
        // 表单部分校验，同的 el-form 校验规则
        rules: '{"propInput":[{"required":true,"message":"请输入活动名称","trigger":"blur"},{"min":3,"max":5,"message":"长度在 3 到 5 个字符","trigger":"blur"}]}',
    },
    {
        "plugin": "form-item",
        "type": "input",
        "label": "文本",
        "prop": "propInput",
        "defaultValue": "",
        "placeholder": "请输入",
        "disabled": false
    },
    {
        "plugin": "form-item",
        "type": "select",
        "label": "选择",
        "prop": "propSelect",
        "defaultValue": "",
        "placeholder": "请选择",
        "disabled": false,
        "multiple": true,
        "optionSource": "",
        "options": [
            {
                "label": "选项1",
                "value": "1"
            },
            {
                "label": "选项2",
                "value": "2"
            }
        ]
    }
]

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
