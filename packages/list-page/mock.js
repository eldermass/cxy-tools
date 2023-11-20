export const queryOptions = [
    {
        prop: "orderWorkNo",
        label: "工单编号",
        type: "input",
        placeholder: "请输入工单编号",
    },
    {
        prop: "orderWorkNo2",
        label: "工单编号2",
        type: "input",
        placeholder: "请输入工单编号",
    },
    {
        prop: "orderWorkNo3",
        label: "工单编号2",
        type: "input",
        placeholder: "请输入工单编号",
    },
    {
        prop: "orderWorkNo4",
        label: "工单编号2",
        type: "input",
        placeholder: "请输入工单编号",
    },
    {
        prop: "orderWorkNo5",
        label: "工单编号2",
        type: "input",
        placeholder: "请输入工单编号",
    },
]

export const defaultQuerys = ["orderWorkNo", "orderWorkNo2", "orderWorkNo3"]

export const tableData = [
    { id: 1, name: "hello" },
    { id: 2, name: "world" },
]

export const pageData = {
    search: {
        queryOptions, // 查询项列表
        defaultQuerys, // 默认查询项
        queryParams: {}, // 默认查询条件
    },
    buttons: [
        "add", // 新增按钮
        "edit", // 编辑按钮
        "delete", // 删除按钮
    ],
    table: {
        tableData, // 表格数据
        columns: [
            {
                prop: "id",
                title: "编码",
                width: 160,
                show_overflow_tooltip: true,
                align: "center",
                sortable: true,
            },
            {
                prop: "name",
                title: "名称",
                width: 160,
                show_overflow_tooltip: true,
                align: "center",
                sortable: false,
            },
        ],
    },
}
