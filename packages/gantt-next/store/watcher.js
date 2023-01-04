import Vue from "vue"
import mockList, { titleGroups, tasks, links } from "../../../mocks/gantt-chart"
// import current from './current'

export default Vue.extend({
  data() {
    return {
      states: {
        nowTime: Date.now(),
        // 每个格子的宽度
        dayBoxWidth: 30,
        dayBoxHeight: 40,
        // 渲染的数据来源
        rows: mockList,
        // 展示的每个任务
        tasks: tasks,
        // 箭头
        links: links,
        // 要展示的日历周期，用于绘制底图
        daysList: [],
        // 左侧分组
        titleGroups: titleGroups,
        // 是否展示左侧分组
        showTitleGroup: true,
        // 内容的y轴滚动距离
        scrollY: 0,
        // y 轴最大滚动
        maxScrollHeight: 0,
      },
    }
  },

  // mixins: [current],

  methods: {
    setSelectedTask(task_id) {
      const tasks = this.states.tasks.slice()

      this.states.tasks = tasks.map((task) => {
        // 修改后的对象用响应式，才能在刷新展示，不然就要调用_computedWatchers里的update才能刷新
        if (task_id === task.task_id) {
          task.is_selected = true
          return JSON.parse(JSON.stringify(task))
        } else if (task.is_selected) {
          delete task.is_selected
          return JSON.parse(JSON.stringify(task))
        }
        return task
      })
      console.log("select", task_id)
    },

    // 检查 rowKey 是否存在
    assertRowKey() {
      const rowKey = this.states.rowKey
      if (!rowKey) throw new Error("[ElTable] prop row-key is required")
    },
    // 重新渲染 左侧表头
    updateColumns() { },
    // 重新渲染列表内容
    scheduleLayout() {
      console.log("scheduleLayout")
    },
    // 选择
    isSelected(row) {
      const { selection = [] } = this.states
      return selection.indexOf(row) > -1
    },

    clearSelection() {
      const states = this.states
      states.isAllSelected = false
      const oldSelection = states.selection
      if (oldSelection.length) {
        states.selection = []
        this.table.$emit("selection-change", [])
      }
    },
  },
})
