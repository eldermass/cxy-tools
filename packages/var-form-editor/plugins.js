export const plugins = [
    {
        id: 1,
        name: "空行",
        plugin: "empty-line",
        construct: [],
    },
    {
        id: 14,
        name: "表单属性",
        plugin: "validate-rules",
        construct: {
            plugin: "validate-rules", // validate-rules form-item table button
            // 表单部分校验，同的 el-form 校验规则
            rules: '{"propInput":[{"required":true,"message":"请输入活动名称","trigger":"blur"},{"min":3,"max":5,"message":"长度在 3 到 5 个字符","trigger":"blur"}]}',
            border: false, // 可选
            borderColor: "#DCDFE6", // 可选
        },
    },
    {
        id: 101,
        name: "纯文本",
        plugin: "prue-text",
        construct: {
            plugin: "prue-text",
            type: "text",
            prop: "propPureText",
            defaultValue: "",
            fixedValue: "",
            style: ""
        },
    },
    {
        id: 102,
        name: "标签文本",
        plugin: "form-item",
        construct: {
            plugin: "form-item",
            type: "text",
            label: "标签文本",
            hide: false,
            prop: "propText",
            defaultValue: "",
        },
    },
    {
        id: 103,
        name: "HTML",
        plugin: "form-item",
        construct: {
            plugin: "form-item",
            type: "html",
            label: "HTML",
            prop: "propHTML",
            fixedValue: "",
        },
    },
    {
        id: 2,
        name: "输入框",
        plugin: "form-item",
        construct: {
            plugin: "form-item",
            type: "input",
            label: "输入框",
            hide: false,
            prop: "propInput",
            defaultValue: "",
            placeholder: "请输入", // 可选
            disabled: false, // 可选
            modalSearch: null,
            onDblClick: null,
            onChange: null,
        },
    },
    {
        id: 3,
        name: "数字",
        plugin: "form-item",
        construct: {
            plugin: "form-item",
            type: "input-number",
            label: "数字",
            prop: "propNumber",
            defaultValue: undefined, // 可选
            disabled: false, // 可选
        },
    },
    {
        id: 4,
        name: "文本域",
        plugin: "form-item",
        construct: {
            plugin: "form-item",
            type: "input-textarea",
            rows: 3, // 仅当 type = textarea 时有效
            label: "文本",
            prop: "propTextarea",
            placeholder: "请输入", // 可选
            defaultValue: undefined, // 可选
            disabled: false, // 可选
        },
    },
    {
        id: 5,
        name: "下拉框",
        plugin: "form-item",
        construct: {
            plugin: "form-item",
            type: "select",
            label: "选择",
            prop: "propSelect",
            defaultValue: "",
            placeholder: "请选择", // 可选
            disabled: false, // 可选
            multiple: true, // 可选,仅当 type = select 时有效, 且对应的值应该是 数组
            // 仅当 type = select 时有效, options 数据的优先级高于 optionSource
            optionSource: "", // get 请求, 返回结构 { data: [{ label: "选项1", value: 1 }] }
            options: [
                {
                    label: "选项1",
                    value: "1",
                },
                {
                    label: "选项2",
                    value: "2",
                },
            ],
        },
    },
    {
        id: 6,
        name: "日期",
        plugin: "form-item",
        construct: {
            plugin: "form-item",
            type: "date-picker",
            dateType: "date", // 可选,仅当 type = date-picker 时有效, 默认为 date year/month/date/week/datetime/datetimerange/daterange
            label: "日期",
            placeholder: "yyyy-mm-dd HH:ii:ss 格式", // 可选
            prop: "propDate",
            defaultValue: "",
            disabled: false, // 可选
        },
    },
    {
        id: 7,
        name: "时间",
        plugin: "form-item",
        construct: {
            plugin: "form-item",
            type: "time-picker",
            label: "时间",
            prop: "propTime",
            defaultValue: "", // 可选
            disabled: false, // 可选
            placeholder: "HH:ii:ss 格式", // 可选
        },
    },
    {
        id: 8,
        name: "开关",
        plugin: "form-item",
        construct: {
            plugin: "form-item",
            type: "switch",
            label: "开关",
            prop: "propSwitch",
            defaultValue: "false", // 可选
            disabled: false, // 可选
        },
    },
    {
        id: 9,
        name: "单选框",
        plugin: "form-item",
        construct: {
            plugin: "form-item",
            type: "radio",
            label: "单选框",
            prop: "propRadio",
            defaultValue: "",
            disabled: false, // 可选
            optionSource: "",
            // options 仅当 type = radio 时有效
            options: [
                {
                    label: "男",
                    value: "1",
                },
                {
                    label: "女",
                    value: "2",
                },
            ],
        },
    },
    {
        id: 10,
        name: "多选框",
        plugin: "form-item",
        construct: {
            plugin: "form-item",
            type: "checkbox",
            label: "多选框",
            prop: "propCheckbox",
            defaultValue: [],
            disabled: false, // 可选
            optionSource: "",
            // options 仅当 type = checkbox 时有效
            options: [
                {
                    label: "中国",
                    value: "1",
                },
                {
                    label: "俄罗斯",
                    value: "2",
                },
            ],
        },
    },
    {
        id: 11,
        name: "表格",
        plugin: "table",
        construct: {
            plugin: "table",
            type: "input",
            prop: "propTable",
            hideOperation: false, // 可选
            height: undefined, // 可选
            apiSource: "", // 可选
            refreshSource: "", // 可选
            border: true, // 可选
            defaultValue: [],
            tableHeaders: [
                // {
                //     label: "名称",
                //     prop: "name",
                //     width: "150", // 可选
                //     align: "center", // 可选
                //     type: "text",
                // },
                // {
                //     label: "地点",
                //     prop: "address",
                //     type: "select",
                //     defaultValue: "",
                //     placeholder: "请选择",
                //     disabled: false,
                //     multiple: true,
                //     width: "150",
                //     align: "center",
                //     optionSource: "",
                // },
                // {
                //     label: "状态",
                //     prop: "status",
                //     type: "switch",
                // },
                // {
                //     label: "验证国家",
                //     prop: "valid_country",
                //     hide: true,
                //     type: "input",
                //     defaultValue: `
                //     (prop, value, row) => {
                //         console.log("valid_name: ", prop, value, row)
                //         return value === "上海市普陀区金沙江路 1518 弄"
                //     }`,
                // },
                // {
                //     label: "国家",
                //     prop: "country",
                //     type: "checkbox",
                //     options: [
                //         {
                //             label: "中国",
                //             value: "1",
                //         },
                //         {
                //             label: "俄罗斯",
                //             value: "2",
                //         },
                //     ],
                // },
            ],
        },
    },
    // 没时间弄表单处理
    // {
    //     id: 12,
    //     name: "表单",
    //     plugin: "form",
    //     construct: {
    //         plugin: "form",
    //         prop: "propForm",
    //         defaultValue: {},
    //         valid_rules: {
    //             name1: [
    //                 { required: true, message: "请输入活动名称", trigger: "blur" },
    //                 { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
    //             ],
    //         },
    //         attributes: [
    //             {
    //                 plugin: "form-item",
    //                 type: "input-textarea", // input input-number input-textarea select date-picker time-picker switch radio checkbox
    //                 rows: 3, // 仅当 type = textarea 时有效
    //                 label: "文本",
    //                 prop: "name1",
    //                 placeholder: "请输入", // 可选
    //                 disabled: false, // 可选
    //             },
    //             [
    //                 {
    //                     plugin: "form-item",
    //                     type: "select",
    //                     label: "选择",
    //                     prop: "name4",
    //                     multiple: true, // 可选,仅当 type = select 时有效, 且对应的值应该是 数组
    //                     // 仅当 type = select 时有效
    //                     options: [
    //                         {
    //                             label: "选项1",
    //                             value: 1,
    //                         },
    //                         {
    //                             label: "选项2",
    //                             value: 2,
    //                         },
    //                     ],
    //                 },
    //                 {
    //                     plugin: "form-item",
    //                     type: "date-picker",
    //                     dateType: "date", // 可选,仅当 type = date-picker 时有效, 默认为 date year/month/date/week/datetime/datetimerange/daterange
    //                     label: "日期",
    //                     prop: "name3",
    //                 },
    //                 {
    //                     plugin: "form-item",
    //                     type: "input-number",
    //                     label: "数字",
    //                     prop: "name2",
    //                 },
    //             ],
    //         ],
    //     },
    // },
    {
        id: 13,
        name: "按钮",
        plugin: "button",
        construct: {
            plugin: "button",
            colorType: "primary", // 可选，同 el-button type
            label: "按钮1",
            prop: "propButton",
            size: "normal", // 可选，同 el-button size
            // 点击回调 (表单数据，默认函数Map，完成回调) => {}
            callback: `(data, funcs,  done) => {
                console.log("click button: ", data, funcs)
                setTimeout(() => {
                    done()
                }, 1000)
            }`,
        },
    },
]
