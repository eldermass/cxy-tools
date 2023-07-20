// json 编辑器 https://www.npmjs.com/package/vue-json-editor

const typeConstruct = {
    prop: "主表名",
    dataType: "form",
    children: [
        {
            prop: "name1",
            dataType: "string",
        },
        {
            prop: "name2",
            dataType: "int",
        },
        {
            prop: "name3",
            dataType: "datetime",
        },
        {
            prop: "name4",
            dataType: "array:int",
        },
        {
            prop: "name5",
            dataType: "array:string",
        },
        {
            prop: "子表名",
            dataType: "table",
            children: [
                {
                    prop: "name1",
                    dataType: "string",
                },
                {
                    prop: "name2",
                    dataType: "int",
                },
                {
                    prop: "name3",
                    dataType: "datetime",
                },
                {
                    prop: "name4",
                    dataType: "array:int",
                },
                {
                    prop: "name5",
                    dataType: "array:string",
                },
            ],
        },
    ],
}
