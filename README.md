# 工具库

## 安装

```bash
npm i cxy-tools
```

## 用法

```js
import Tools from "cxy-tools"
Vue.use(Tools)

// 局部使用
import { varForm } from "./index"
Vue.use(varForm)
```

## 组件

### 甘特图

[demo 地址](http://cy285653184.gitee.io/gant-demo/)

`gantt-next`

#### Props

`start_time` string 日历列表开始时间

`days` number 默认 10, 日历列表的总长度

`oDayBoxHeight` number 40 每一行的高度

`oDayBoxWidth` nunmber 60 每一天的宽度，18 及以下时为周视图

`titles` obj[] 按行分组，title 展示名，length 行数

```js
titles = [
    {
        title: "2 号楼 1 楼SMT车间",
        length: 9,
    },
]
```

`tasks` obj[] 任务贴片

```js
task = {
    task_id: 1, // 唯一识别，不可重复
    text: "1111111111111", // 展示文字
    row_index: 0, // 第几行
    start_date: "2023-01-13 12:00:00",
    duration: 2.5,
    theme: "gray", // 主题色
    is_lock: false, // 锁定状态
    data: {}, // 原始数据
    // 页面操作后产生的值
    is_selected: true, // 是否选中
    end_date: "2023-01-13 06:22:00" // 结束事件，拖拽尾部后产生
    is_drag_changed: true // 是否被拖拽过，拖拽后产生
    is_row_index_changed: true // 是否被拖到其他行
    row_info: {} // 被拖拽到其他时，新行的行信息
}

// themeType 可选的色彩主题
// ("deepgreen", #179c17, #66cf6d),
// ("green", #6bb42e, #a5e99d),
// ("lightgreen", #7cc93d, #d7eec0),
// ("lightpurple", #b5b1f1, #e7dbff),
// ("purple", #908ae0, #c5c5f9),
// ("mediumpurple", #7e78dc, #ba9fff),
// ("red", #eb3626, #fb9e99),
// ("pink", #cb717b, #fbc3c4),
// ("lightpink", #f3b5bc, #ffe6e7),
// ("blue", #2885e1, #8bc3ff),
// ("skyblue", #79c2da, #a8e3ff),
// ("cyan", #afbfe4, #dfebf7),
// ("yellow", #ffb300, #ffe9c2),
// ("lightyellow", #ffbf00, #fff5aa),
// ("greenyellow", #99ff00, #e1fa7f),
// ("orange", #db8000, #ffb35d),
// ("lightgray", #cdcdcd, #f5f5f5),
// ("gray", #bbbbbb, #ededed)
```

`links` 连线

```js
link = {
    source_id: 2, // 开始的 task_id
    source_point: "end",
    target_id: 5, // 结束的 task_id
    target_point: "start",
    group_id: 1, // 连线分组，激活时同组全部激活
}
```

`rows`

```js
row = {
    id: 1,
    name: "SMT-A1",
}
```

`adsorbType`: number 吸附类型: 0 不吸附, 1 小时吸附，2 按天吸附

`assistLine`: boolean 拖拽辅助线

`rightMenulists` 右键菜单

```js
{
    fnName: "insert", // 注册事件 menu-insert
    params: {}, // 携带参数
    icoName: "el-icon-download", // icon
    btnName: "插 单", //
    type: 'default|clicktask', // 点击task展示不同内容
    // divided: true,
    // disabled: true,
    // children: [],
}
```

#### events

`task-dbclick` (task) => void

```js
// 被点击的任务
handleTaskClick(task) {
    console.log('双击任务:  ', task)
}
```

`task-change` (task, origin_task) => void

```js
// 将要改变为，原来的任务item
handleTaskChange(task, origin_task) {
    console.log('改变任务', task, origin_task)
}
```

`task-change-error` (task, origin_task, type) => void

```js
// 将要改变为，原来的，错误类型
handleTaskChangeError(task, origin_task, type) {
    console.log('error ' + type, task, origin_task)
}
```

#### methods

`getData` (onlyChanged) => Task[] , onlyChanged 默认 true，获取的数组是否为改变过后的数据

```js
getData() {
    // 默认变化过的
    const data = this.$refs.gantt.getData(true)
    console.log(data)
    // data 数据结构为 Task[]
}
```

`setDayBoxWidth` (width: number) => void 设置每天宽度

```js
setBoxWidth(width = 60) {
    this.$refs.gantt.setDayBoxWidth(width)
}
```

`changeTaskItem` (task_id, change_obj) => void

```js
changeTaskTime() {
    // task_id: number, task
    this.$refs.gantt.changeTaskItem(this.tasks[5].task_id, { duration: 5 })
    // 例子中的 duration 将覆盖为 5
}
```

change_obj 为 task 中可改变的 key 值

#### 操作

ctrl + 滚动，缩放每日长度
alt + 滚动，横向滚动
ctrl + shift + s 配置页面

```bash
吸附类型: 拖拽时，按何种时间点吸附
时长(天)：需要显示的天数
单日宽度: 每天的展示宽度
```

### varForm 可变表单

#### 示例

```vue
<template>
    <div>
        <div class="demo-form">
            <var-form ref="varForm" :form-data="formData" :schema="mockSchema" />
        </div>
        <el-button @click="getFormData">获取数据</el-button>
        <el-button @click="setFormData">设置数据</el-button>
        <el-button @click="updateFormData">更新数据</el-button>
        <el-button @click="getDataAndSchema">获取数据和结构</el-button>
    </div>
</template>

<script>
import { mockData, mockSchema } from "../../mocks/var-form"

export default {
    name: "demo-form",
    data() {
        return {
            formData: mockData,
            mockSchema,
        }
    },
    mounted() {
        setTimeout(() => {
            this.testUpdate()
        }, 2000)
    },
    methods: {
        getFormData() {
            console.log(this.$refs.varForm.getFormData())
        },
        setFormData() {
            this.$refs.varForm.setFormData({
                name1: "李四",
                name2: "王五",
            })
        },
        updateFormData() {
            this.$refs.varForm.updateFormData("name1", "张三")
        },
        getDataAndSchema() {
            console.log(this.$refs.varForm.getDataAndSchema())
        },
        // 调试更新
        testUpdate() {
            const formData = this.$refs.varForm.getFormData()
            formData.table1.push({
                date: "2016-05-02",
                name: "王麻虎",
                address: "上海市普陀区金沙江路 1518 弄",
                country: [1],
            })

            this.$refs.varForm.updateFormData("table1", formData.table1)
        },
    },
}
</script>
<style lang="scss" scoped>
.demo-form {
    border: 1px solid skyblue;
}
</style>
```

var-form.js 中 mock 的数据

```js
export const mockData = {
    name1: "张三",
    // name2: 3,
    name3: "2023-07-11 00:00:00",
    name4: [1],
    // name24: [],
    table1: [
        {
            date: "2016-05-02",
            name: "王大虎",
            address: "上海市普陀区金沙江路 1518 弄",
            // 当前属性，当前值，当前行数据
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
        plugin: "validate-rules",
        // element-ui 中相同的格式 校验规则
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
    [
        {
            plugin: "button",
            type: "primary",
            label: "按钮1",
            prop: "button",
            size: "normal", // 可选
            // 回调可选
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

```
