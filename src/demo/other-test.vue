<template>
    <div>
        <cxy-tree v-model="treeValue" :options="options" :filterable="true" :muliple="true" :leafOnly="true"
            @change="handleChange" />
        <br />
        <cxy-button>hello</cxy-button>
        <search-panel :param-list="search.queryOptions" :default-querys="search.defaultQuerys" />
        <cxy-open-dir ref="opendir" :multiple="true" @change="handlePicked" />
    </div>
</template>

<script>

export default {
    name: "other-test",
    data() {
        return {
            options: [
                {
                    id: 1,
                    title: '一级 1',
                    children: [
                        {
                            id: 4,
                            title: '二级 1-1',
                            children: [
                                {
                                    id: 9,
                                    title: '三级 1-1-1'
                                },
                                {
                                    id: 10,
                                    title: '三级 1-1-2'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    title: '一级 2',
                    children: [
                        {
                            id: 5,
                            title: '二级 2-1'
                        },
                        {
                            id: 6,
                            title: '二级 2-2'
                        }
                    ]
                },
                {
                    id: 3,
                    title: '一级 3',
                    children: [
                        {
                            id: 7,
                            title: '二级 3-1'
                        },
                        {
                            id: 8,
                            title: '二级 3-2'
                        }
                    ]
                }
            ],
            treeValue: 9, // [9, 10]
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
                    }
                ], // 查询项列表
                defaultQuerys: ["input", "sex"], // 默认查询项
                queryParams: {}, // 默认查询条件
            }
        }
    },
    methods: {
        handleChange(val, node) {
            console.log("---", val, node)
        },
        async handlePicked(val) {
            const text = await this.$refs.opendir.getFileFromHandle(val[0])
            console.log(text)
        }
    }
}
</script>