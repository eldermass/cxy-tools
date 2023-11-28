export const pageData = {
    search: {
        queryOptions: [
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
            {   // 使用 slot 拓展查询项
                prop: "test",
                label: "slot 测试",
                type: "slot",
                slotName: "slot1",
            },
            {
                prop: "test2",
                label: "slot2 测试",
                type: "slot",
                slotName: "slot2",
            },
        ], // 查询项列表
        defaultQuerys: ["orderWorkNo", "test", "test2"], // 默认查询项
        queryParams: {}, // 默认查询条件
    },
    buttons: [
        {
            component: "button-add", // 新增按钮
            columns: [
                {
                    label: "名称", // 标签名
                    prop: "name", // 字段名
                    type: "input", // 组件类型
                    placeholder: "请输入名称", // 占位符
                    rules: [{ required: true, message: "请输入名称", trigger: "blur" }], // 校验规则
                },
            ],
        },
        {
            component: "button-edit", // 修改按钮
        },
        {
            component: "button-delete", // 删除按钮
        },
        {
            component: "button-export", // 导出按钮
        },
        {
            title: "测试组件", // 测试组件
            component: "col-button", // 组件名
            opration: (obj) => {
                console.log("操作", obj)
            }, // 操作函数
        },
        {
            title: "不需要",
            component: (h) => h("el-button", { props: { type: "warning", size: "mini" } }, "测试render"), // render 函数
        },
    ],
    table: {
        requestUrl: "http://10.10.2.201:8881/api/pageinfo/", // 请求地址
        tableData: [
            { id: 1, name: "hello" },
            { id: 2, name: "world" },
        ], // 表格数据, 如果有该值，首次将不请求
        columns: [
            {
                prop: "id",
                title: "编码",
                width: 160, // ? 列宽
                align: "center", // ? 对齐方式
                sortable: true, // ? 是否可排序
                show_overflow_tooltip: true, // ? 是否显示 tooltip
            },
            {
                prop: "name",
                title: "名称",
                width: 160,
                align: "center",
                sortable: true,
                show_overflow_tooltip: true,
            },
            {
                prop: "title",
                title: "标题",
                width: 160,
                align: "center",
                sortable: true,
                show_overflow_tooltip: true,
                hide: true, // ? 是否隐藏
            },
        ],
    },
    pages: {
        pageNum: 1, // 当前页码 ***
        pageSize: 20, // 每页条数 ***
        total: 50,
        pageSizeOpts: [10, 20, 50, 100, 200, 500], // 每页条数选项
    },
}
