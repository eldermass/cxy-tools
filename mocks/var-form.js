export const mockData = {
    name1: "名曰 John",
    name2: 3,
    name3: "2023-07-11 00:00:00",
    name4: [1],
    name24: [],
    table1: [
        {
            date: "2016-05-02",
            name: "王大虎",
            address: "上海市普陀区金沙江路 1518 弄",
        },
        {
            date: "2016-05-04",
            name: "王二虎",
            address: "上海市普陀区金沙江路 1517 弄",
        },
        {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
        },
        {
            date: "2016-05-03",
            name: "王幼虎",
            address: "上海市普陀区金沙江路 1516 弄",
        },
    ],
}

export const mockSchema = [
    {
        plugin: "form-item",
        type: "input-textarea", // input input-number input-textarea select date-picker time-picker cascader switch radio checkbox
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
                }
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
        ],
    },
    [
        {
            plugin: "button",
            type: "primary",
            label: "按钮1",
            prop: "button",
            size: "normal", // 可选
            // 回调可选
            callback: (formData, done) => {
                console.log("click button: ", formData)
                setTimeout(() => {
                    done()
                }, 1000)
            },
        },
        {
            plugin: "button",
            type: "normal",
            label: "按钮2",
            prop: "button",
        },
    ],
]
