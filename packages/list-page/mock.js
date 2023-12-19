export const pageData = {
    pageId: "material index page", // 页面唯一标识,不可重复
    search: {
        queryOptions: [
            {
                prop: "input",
                label: "输入框",
                type: "input", // 输入框
                placeholder: "请输入工单编号",
            },
            {
                prop: "sex",
                label: "下拉选择",
                type: "select",
                placeholder: "选择性别",
                // multiple: true, // ? 是否多选
                options: [
                    { label: "男", value: 1 },
                    { label: "女", value: 2 },
                ],
            },
            {
                prop: "datetest",
                label: "时间测试",
                type: "datetime", // 时间选择器
                placeholder: "请选择时间",
            },
            {
                prop: "tree",
                label: "树形",
                type: "tree", // 插槽
                placeholder: "树形",
                filterable: true,
                muliple: true,
                leafonly: true,
                // props: {
                //     value: "id", // ID字段名
                //     label: "label", // 显示名称
                //     children: "children", // 子级字段名
                // },
                options: [
                    {
                        id: 1,
                        title: "一级 1",
                        children: [
                            {
                                id: 4,
                                title: "二级 1-1",
                                children: [
                                    {
                                        id: 9,
                                        title: "三级 1-1-1",
                                    },
                                    {
                                        id: 10,
                                        title: "三级 1-1-2",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                prop: "test",
                label: "插槽测试",
                type: "slot", // 插槽
                slotName: "slottest",
            },
        ], // 查询项列表
        defaultQuerys: ["tree", "sex", "datetest", "test"], // 默认查询项
        queryParams: {}, // 默认查询条件
    },
    buttons: [
        {
            component: "button-add", // 新增按钮
            columns: [
                {
                    label: "输入框", // 标签名
                    prop: "input", // 字段名
                    type: "input", // 组件类型
                    placeholder: "请输入名称", // ? 占位符
                    rules: [{ required: true, message: "请输入名称", trigger: "blur" }], // ? 校验规则
                },
                {
                    label: "文本框", // 标签名
                    prop: "textarea", // 字段名
                    type: "input-textarea", // 组件类型
                    placeholder: "请输入名称", // ? 占位符
                    disabled: true, // ? 是否禁用
                    rules: [{ required: true, message: "请输入名称", trigger: "blur" }], // ? 校验规则
                },
                {
                    label: "数字框", // 标签名
                    prop: "number", // 字段名
                    type: "input-number", // 组件类型
                    placeholder: "请输入名称", // ? 占位符
                    rules: [{ required: true, message: "请输入名称", trigger: "blur" }], // ? 校验规则
                },
                {
                    label: "下拉框", // 标签名
                    prop: "select", // 字段名
                    type: "select", // 组件类型
                    placeholder: "请输入名称", // ? 占位符
                    multiple: true, // ? 是否多选
                    options: [
                        { label: "男", value: 1 },
                        { label: "女", value: 2 },
                    ], // 下拉选项
                    rules: [{ required: true, message: "请输入名称", trigger: "blur" }], // ? 校验规则
                },
                {
                    label: "日期选择", // 标签名
                    prop: "datepicker", // 字段名
                    type: "date-picker", // 组件类型
                    placeholder: "请输入名称", // 占位符
                    dateType: "date", // ? 日期类型
                    rules: [{ required: true, message: "请输入名称", trigger: "blur" }], // 校验规则
                },
                {
                    label: "时间选择", // 标签名
                    prop: "timepicker", // 字段名
                    type: "time-picker", // 组件类型
                    placeholder: "请输入名称", // 占位符
                    rules: [{ required: true, message: "请输入名称", trigger: "blur" }], // 校验规则
                },
                {
                    label: "开关", // 标签名
                    prop: "switch", // 字段名
                    type: "switch", // 组件类型
                    rules: [{ required: true, message: "请输入名称", trigger: "blur" }], // ？ 校验规则
                },
                {
                    label: "单选", // 标签名
                    prop: "radio", // 字段名
                    type: "radio", // 组件类型
                    options: [
                        { label: "男", value: 1 },
                        { label: "女", value: 2 },
                    ],
                    rules: [{ required: true, message: "请输入名称", trigger: "blur" }], // 校验规则
                },
                {
                    label: "多选", // 标签名
                    prop: "checkbox", // 字段名
                    type: "checkbox", // 组件类型
                    options: [
                        { label: "男", value: 1 },
                        { label: "女", value: 2 },
                    ],
                    rules: [{ required: true, message: "请输入名称", trigger: "blur" }], // 校验规则
                },
                {
                    label: "HTML", // 标签名
                    prop: "html", // 字段名
                    type: "html", // 组件类型
                    fixedValue: '<span style="color: red">测试</span>', // 固定值
                },
                {
                    label: "text", // 标签名
                    prop: "text", // 字段名
                    type: "text", // 组件类型
                },
            ],
            requestUrl: "http://localhost:3333/api/add", // 新增请求地址
        },
        {
            component: "button-edit", // 修改按钮
            columns: [
                {
                    label: "输入框", // 标签名
                    prop: "input", // 字段名
                    type: "input", // 组件类型
                    placeholder: "请输入名称", // ? 占位符
                    rules: [{ required: true, message: "请输入名称", trigger: "blur" }], // ? 校验规则
                },
                {
                    label: "文本框", // 标签名
                    prop: "textarea", // 字段名
                    type: "input-textarea", // 组件类型
                    placeholder: "请输入名称", // ? 占位符
                    disabled: true, // ? 是否禁用
                    rules: [{ required: true, message: "请输入名称", trigger: "blur" }], // ? 校验规则
                },
                {
                    label: "数字框", // 标签名
                    prop: "number", // 字段名
                    type: "input-number", // 组件类型
                    placeholder: "请输入名称", // ? 占位符
                    rules: [{ required: true, message: "请输入名称", trigger: "blur" }], // ? 校验规则
                },
                {
                    label: "下拉框", // 标签名
                    prop: "select", // 字段名
                    type: "select", // 组件类型
                    placeholder: "请输入名称", // ? 占位符
                    multiple: true, // ? 是否多选
                    options: [
                        { label: "男", value: 1 },
                        { label: "女", value: 2 },
                    ], // 下拉选项
                    rules: [{ required: true, message: "请输入名称", trigger: "blur" }], // ? 校验规则
                },
                {
                    label: "日期选择", // 标签名
                    prop: "datepicker", // 字段名
                    type: "date-picker", // 组件类型
                    placeholder: "请输入名称", // 占位符
                    dateType: "date", // ? 日期类型
                    rules: [{ required: true, message: "请输入名称", trigger: "blur" }], // 校验规则
                },
                {
                    label: "时间选择", // 标签名
                    prop: "timepicker", // 字段名
                    type: "time-picker", // 组件类型
                    placeholder: "请输入名称", // 占位符
                    rules: [{ required: true, message: "请输入名称", trigger: "blur" }], // 校验规则
                },
                {
                    label: "开关", // 标签名
                    prop: "switch", // 字段名
                    type: "switch", // 组件类型
                    rules: [{ required: true, message: "请输入名称", trigger: "blur" }], // ？ 校验规则
                },
                {
                    label: "单选", // 标签名
                    prop: "radio", // 字段名
                    type: "radio", // 组件类型
                    options: [
                        { label: "男", value: 1 },
                        { label: "女", value: 2 },
                    ],
                    rules: [{ required: true, message: "请输入名称", trigger: "blur" }], // 校验规则
                },
                {
                    label: "多选", // 标签名
                    prop: "checkbox", // 字段名
                    type: "checkbox", // 组件类型
                    options: [
                        { label: "男", value: 1 },
                        { label: "女", value: 2 },
                    ],
                    rules: [{ required: true, message: "请输入名称", trigger: "blur" }], // 校验规则
                },
            ],
            requestUrl: "http://localhost:3333/api/add", // 修改请求地址
        },
        {
            component: "button-delete", // 删除按钮
            requestUrl: "http://localhost:3333/api/delete", // 删除请求地址
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
        // 三种数据方式只能选其中一个
        // requestUrl: "http://10.10.2.201:8881/api/pageinfo/", // 请求地址，不填则不请求
        requestUrl: "http://localhost:3333/api/data", // 请求地址，不填则不请求
        // requestFunc: (setTable, params) => {
        //     console.log("调用请求函数： ", params)
        //     setTimeout(() => {
        //         setTable([{ id: 5, name: "使用外部函数控制数据" }])
        //     }, 1000)
        // },
        // tableData: [
        //     { id: 1, name: "hello" },
        //     { id: 2, name: "world" },
        // ], // 表格数据, 如果有该值，首次将不请求
        childrenTable: {
            prop: "items", // ? 子表格字段名
            columns: [ // 子表列配置，与主表 columns 一致
                {
                    prop: "id",
                    title: "编码",
                    width: 160, // ? 列宽
                    align: "center", // ? 对齐方式
                    sortable: true, // ? 是否可排序
                    show_overflow_tooltip: true, // ? 是否显示 tooltip
                    options: [
                        { label: "编码一", value: 1 },
                        { label: "编码二", value: 2 },
                    ], // ? 如果有 options 则显示 options 的 label
                },
                {
                    prop: "name",
                    title: "名称",
                    width: 160,
                    align: "center",
                    sortable: true,
                    show_overflow_tooltip: true,
                },
            ],
        },
        columns: [
            {
                prop: "id",
                title: "编码",
                width: 160, // ? 列宽
                align: "center", // ? 对齐方式
                sortable: true, // ? 是否可排序
                show_overflow_tooltip: true, // ? 是否显示 tooltip
                options: [
                    { label: "编码一", value: 1 },
                    { label: "编码二", value: 2 },
                ], // ? 如果有 options 则显示 options 的 label
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
            {
                prop: "image",
                title: "插槽",
                width: 160,
                align: "center",
                slotName: "imageSlot", // ? 插槽名称
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
