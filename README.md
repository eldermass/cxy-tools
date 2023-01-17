# aps

## 用法

```js
import Tools from "cxy-tools"
Vue.use(Tools)
```

## 组件

### 甘特图(新)

`gantt-next`

#### Props

`start_time` string 日历列表开始时间

`days` number 默认 10, 日历列表的总长度

`oDayBoxHeight` number 40 每一行的高度

`oDayBoxWidth` nunmber 60 每一天的宽度，18及以下时为周视图

`titles` obj[] 按行分组，title 展示名，length 行数

```js
titles = [
{
    title: "2 号楼 1 楼SMT车间",
    length: 9
}]
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
    name: "SMT-A1"
}
```

`adsorbType`: number 吸附类型: 0不吸附, 1小时吸附，2按天吸附

`assistLine`: boolean 拖拽辅助线

#### events

`task-dbclick` (task) => void
`task-change` (task) => void

#### methods

`getData` (onlyChanged) => Task[] , onlyChanged 默认true，获取的数组是否为改变过后的数据

`setDayBoxWidth` (width: number) => void 设置每天宽度

`changeTaskItem` (task_id, change_obj) => void

change_obj 为 task 中可改变的 key 值

#### 操作

ctrl + 滚动，缩放每日长度
alt + 滚动，横向滚动
ctrl + shift + s 配置页面(没做)
