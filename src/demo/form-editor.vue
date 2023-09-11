<template>
    <div class="demo-form-editor">
        <var-form-editor v-if="mockFormSchema.length" ref="formEditor" :external-funcs="externalFuncs"
            :form-schema="mockFormSchema" :form-data="mockFormData" />
        <el-button @click="getFormSchema">页面结构</el-button>
        <el-button @click="getTypeData">数据结构</el-button>
        <el-button @click="getFormData">默认数据</el-button>
        <el-button @click="getEditFormData">编辑数据</el-button>
        <el-button @click="getValidateFormData">校验数据</el-button>
        <dialog-table ref="dialogTable" />
    </div>
</template>

<script>
import dialogTable from './dialog-table.vue'

const mockFormSchema = [
    {
        "plugin": "form-item",
        "type": "input",
        "label": "输入框",
        "hide": false,
        "prop": "propInput",
        "defaultValue": "",
        "placeholder": "请输入",
        "disabled": false
    },
    {
        "plugin": "form-item",
        "type": "input-number",
        "label": "数字",
        "prop": "propNumber",
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
    },
    {
        "plugin": "table",
        "type": "input",
        "prop": "propTable",
        "apiSource": "",
        "refreshSource": "",
        "border": true,
        "defaultValue": [
            {
                "a": ""
            }
        ],
        "tableHeaders": [
            {
                "label": "a",
                "prop": "a",
                "width": "",
                "align": "",
                "type": "input",
                onChange: "(row, fn) => { console.log('change: ', row, fn) }",
                onBindInput: "(row, fn) => { console.log('onBindInput: ', row, fn) }"
            },
            {
                "label": "b",
                "prop": "b",
                "width": "",
                "align": "",
                "type": "input"
            },
            {
                "label": "c=a+b",
                "prop": "c",
                "width": "",
                "align": "",
                "type": "input",
                autocomputed: "(row, fn) => { fn.add('a', 'b') }"
            },
            {
                "label": "d=a*b",
                "prop": "d",
                "width": "",
                "align": "",
                "type": "input",
                autocomputed: "(row) => { this.$set(row, 'd', Number(row.a) * Number(row.b)) }"
            },
            {
                "label": "e=a-b",
                "prop": "e",
                "width": "",
                "align": "",
                "type": "input",
                // 第三个参数可选，默认当前 prop
                autocomputed: "async (row, fn) => { let user = await fn.exFuncs.getUserName(); console.log(user); this.$set(row, 'e', user) }"
            },
            {
                "label": "valid_a",
                "prop": "valid_a",
                "type": "input",
                defaultValue: `
                    (prop, value, row) => {
                        console.log("valid_name: ", prop, value, row)
                        return value === "上海市普陀区金沙江路 1518 弄"
                    }
                `,
            },
        ]
    }
]

const mockFormData = {
    "propInput": "123",
    "propNumber": 2,
    "propSelect": [
        "1"
    ],
    "propTable": [
        {
            "a": 1,
            "b": 2
        }
    ]
}

export default {
    name: 'demo-form-edito',
    components: {
        dialogTable
    },
    data() {
        return {
            mockFormSchema: [],
            mockFormData,
            externalFuncs: {
                getUserName: () => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve('张三')
                        }, 1000)
                    })
                },
                openDialog: this.openDialog
            }
        }
    },
    mounted() {
        setTimeout(() => {
            this.mockFormSchema = mockFormSchema
        }, 100)
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
        },
        getEditFormData() {
            console.log(this.$refs.formEditor.getEditFormData())
        },
        async getValidateFormData() {
            const validData = await this.$refs.formEditor.getValidateFormData().catch(err => {
                console.error("验证失败：", err)
            })
            console.log(validData)
        },
        // 弹窗收索
        async openDialog(url) {
            return new Promise((resolve) => {
                this.$refs.dialogTable.show(resolve, url)
            })
        }
    },
}

</script>
<style lang="scss" scoped>
.demo-form-editor {
    height: 100%;
}
</style>
