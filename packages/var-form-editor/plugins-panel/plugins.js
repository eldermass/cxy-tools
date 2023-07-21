export const plugins = [
    {
        name: "输入框",
        plugin: "form-item",
        construct: {
            plugin: "form-item",
            type: "input",
            label: "文本",
            prop: "name1",
            placeholder: "请输入", // 可选
            disabled: false, // 可选
        },
    },
    {
        name: "文本域",
        plugin: "form-item",
        construct: {
            plugin: "form-item",
            type: "input-textarea", 
            rows: 3, // 仅当 type = textarea 时有效
            label: "文本",
            prop: "name1",
            placeholder: "请输入", // 可选
            disabled: false, // 可选
        },
    },
]
