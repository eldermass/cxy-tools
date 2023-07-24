/**
 * 1. data 中的属性名必须和 schema 中的 prop 相同
 * 2. valid_prop 需要是一个函数且有返回值，(prop, value, row) => Boolean
 */

export const mockData = {
    name1: "张三",
    // name2: 3,
    name3: "2023-07-11 00:00:00",
    name4: ["1"],
    // name24: [],
    form1: {
        // name1: "狗蛋",
    },
    table1: [
        {
            date: "2016-05-02",
            name: "王大虎",
            address: "上海市普陀区金沙江路 1518 弄",
            // 验证字段，返回为当前属性，当前值，当前行数据 
            // (prop: string, value: string, row: { prop: value... }) => Boolean
            valid_address: `
            (prop, value, row) => {
                console.log("valid_name: ", prop, value, row)
                return value === "上海市普陀区金沙江路 1518 弄"
            }
            `,
            country: [],
        },
        {
            date: "2016-05-04",
            name: "王二虎",
            address: "上海市普陀区金沙江路 1517 弄",
        }
    ],
}

export const mockSchema = [
    {
        plugin: "validate-rules", // validate-rules form-item table button
        // 表单部分校验，同的 el-form 校验规则
        rules: {
            name1: [
                { required: true, message: "请输入活动名称", trigger: "blur" },
                { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
            ],
        },
    },
    {
        plugin: "form-item",
        type: "input-textarea", // input input-number input-textarea select date-picker time-picker switch radio checkbox
        rows: 3, // 仅当 type = textarea 时有效
        label: "文本",
        prop: "name1",
        placeholder: "请输入", // 可选
        disabled: false, // 可选
    },
    [
        {
            plugin: "form-item",
            type: "select",
            label: "选择",
            prop: "name4",
            multiple: true, // 可选,仅当 type = select 时有效, 且对应的值应该是 数组
            // 仅当 type = select 时有效, options 数据的优先级高于 optionSource
            optionSource: "http://10.10.2.201:8881/api/modalinfo/1/" // get 请求, 返回结构 { data: [{ label: "选项1", value: 1 }] }
            // options: [
            //     {
            //         label: "选项1",
            //         value: 1,
            //     },
            //     {
            //         label: "选项2",
            //         value: 2,
            //     },
            // ],
        },
        {
            plugin: "form-item",
            type: "date-picker",
            dateType: "date", // 可选,仅当 type = date-picker 时有效, 默认为 date year/month/date/week/datetime/datetimerange/daterange
            label: "日期",
            prop: "name3",
        },
        {
            plugin: "form-item",
            type: "input-number",
            label: "数字",
            prop: "name2",
        },
    ],
    [
        {
            plugin: "form-item",
            type: "time-picker",
            label: "时间",
            prop: "name21",
        },
        {
            plugin: "form-item",
            type: "switch",
            label: "开关",
            prop: "name22",
        },
        {
            plugin: "form-item",
            type: "radio",
            label: "单选框",
            prop: "name23",
            // options 仅当 type = radio 时有效
            options: [
                {
                    label: "男",
                    value: 1,
                },
                {
                    label: "女",
                    value: 2,
                },
            ],
        },
        {
            plugin: "form-item",
            type: "checkbox",
            label: "多选框",
            prop: "name24",
            // options 仅当 type = checkbox 时有效
            options: [
                {
                    label: "中国",
                    value: 1,
                },
                {
                    label: "俄罗斯",
                    value: 2,
                },
            ],
        },
    ],
    {
        plugin: "table",
        type: "input",
        prop: "table1",
        border: true, // 可选
        tableHeaders: [
            {
                label: "名称",
                prop: "name",
                width: "150", // 可选
                align: "center", // 可选
                type: "text",
            },
            {
                label: "地点",
                prop: "address",
                width: "150",
                align: "center",
                type: "input",
            },
            {
                label: "状态",
                prop: "status",
                type: "switch",
            },
            {
                label: "国家",
                prop: "country",
                type: "checkbox",
                options: [
                    {
                        label: "中国",
                        value: 1,
                    },
                    {
                        label: "俄罗斯",
                        value: 2,
                    },
                ],
            },
        ],
    },
    {
        plugin: "form",
        prop: "form1",
        valid_rules: {
            name1: [
                { required: true, message: "请输入活动名称", trigger: "blur" },
                { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
            ],
        },
        attributes: [
            {
                plugin: "form-item",
                type: "input-textarea", // input input-number input-textarea select date-picker time-picker switch radio checkbox
                rows: 3, // 仅当 type = textarea 时有效
                label: "文本",
                prop: "name1",
                placeholder: "请输入", // 可选
                disabled: false, // 可选
            },
            [
                {
                    plugin: "form-item",
                    type: "select",
                    label: "选择",
                    prop: "name4",
                    multiple: true, // 可选,仅当 type = select 时有效, 且对应的值应该是 数组
                    // 仅当 type = select 时有效
                    options: [
                        {
                            label: "选项1",
                            value: 1,
                        },
                        {
                            label: "选项2",
                            value: 2,
                        },
                    ],
                },
                {
                    plugin: "form-item",
                    type: "date-picker",
                    dateType: "date", // 可选,仅当 type = date-picker 时有效, 默认为 date year/month/date/week/datetime/datetimerange/daterange
                    label: "日期",
                    prop: "name3",
                },
                {
                    plugin: "form-item",
                    type: "input-number",
                    label: "数字",
                    prop: "name2",
                },
            ],
        ]
    },
    [
        {
            plugin: "button",
            type: "primary", // 可选，同 el-button type
            label: "按钮1",
            prop: "button",
            size: "normal", // 可选，同 el-button size
            // 点击回调 (表单数据，默认函数Map，完成回调) => {}
            callback: `(data, funcs,  done) => {
                console.log("click button: ", data, funcs.getValidateForm())
                setTimeout(() => {
                    done()
                }, 1000)
            }`,
        },
        {
            plugin: "button",
            type: "normal",
            label: "按钮2",
            prop: "button",
            size: "normal", // 可选
            callback: (data, funcs, done) => {
                console.log("click button: ", data)
                setTimeout(() => {
                    done()
                }, 1000)
            }
        },
    ],
]
