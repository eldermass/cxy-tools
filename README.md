# aps

## 用法

```js
import Tools from "cxy-tools"
Vue.use(Tools)
```

## 组件

### 甘特图

`gantt-chart`

#### Props

`start_timestamp` 日历列表开始时间的时间戳

`days` 日历列表的时间长度，默认 10

`titles` 资源分组，title 展示名，length 高度

```js
titles = [
{
    title: "2 号楼 1 楼SMT车间",
    length: 9
}]
```

`dataList` 展示的数据
`id` 涉及了拖拽落点的判断，是必选唯一的
`name` 一列资源的名字
`items` 一个事件的排期

```js
data = [
    {
        id: 1,
        name: "SMT-A1",
        items: [
            {
                id: 3,
                title: "M2208018STA-P3",
                startAt: "2022-08-15",
                endAt: "2022-08-16",
                themeType: "cyan",
            }
        ]
    }
]

// themeType 可选的色彩主题
// (default, #cb717b, #fbc3c4)
// ("green", #6bb42e, #d7eec0)
// ("purple", #7d78c8, #c5c5f9)
// ("blue", #afbfe4, #dfebf7)
// ("red", #eb3626, #f7635c)
// ("cyan", #3498ff, #a6d7ff)
// ("yellow", #ffb300, #ffe9c2)
// ("orange", #db8000, #fa9b2f)
```

#### events

`item-click` (data) => void
`item-drop` (from, to) => void
`drag-error` (msg) => void

#### methods

`getData` () => []

```js
[
    {
        id: 1,
        name: "SMT-A1",
        items: [
            {
                id: 3,
                title: "M2208018STA-P3",
                startAt: "2022-08-15",
                endAt: "2022-08-16",
                themeType: "cyan",
            }
        ]
    }
]
```
