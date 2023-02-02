import _ from 'lodash'
import Vue from "vue"
// import current from './current'

export default Vue.extend({
  data() {
    return {
      states: {
        // 表格开始时间
        nowTime: '2023-01-01',
        // 每个格子的宽度
        dayBoxWidth: 30,
        dayBoxHeight: 40,
        // 渲染的数据来源
        rows: [],
        // 展示的每个任务
        tasks: [],
        // 箭头
        originLinks: [],
        links: [],
        // 要展示的日历周期，用于绘制底图
        daysList: [],
        // 左侧分组
        titleGroups: [],
        // 是否展示左侧分组
        showTitleGroup: true,
        // 内容的y轴滚动距离
        scrollY: 0,
        // y 轴最大滚动
        maxScrollHeight: 0,
        // 吸附类型:0不吸附,1小时吸附，2按天吸附
        adsorbType: 0,
        // 拖拽辅助线
        assistLine: true,
        assistLineActive: false,
        assistTipTime: '',
        // 双击回调函数
        handleTaskDbClickFn: undefined,
        // 任务改变的回调
        handleTaskChangeFn: undefined,
        // 拖拽错误时的回调
        handleTaskChangeErrorFn: undefined
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
          return _.cloneDeep(task)
        } else if (task.is_selected) {
          delete task.is_selected
          return _.cloneDeep(task)
        }
        return task
      })
      // console.log("select", task_id)
      this.setLinksActive(task_id)
    },
    // 设置 连线激活
    setLinksActive(task_id) {
      const activeLink = this.states.originLinks.find(link => link.source_id === task_id || link.target_id === task_id)
      if (!activeLink) {
        this.states.links = []
        return
      }
      const links = this.states.originLinks.filter(link => link.group_id === activeLink.group_id)
      this.states.links = links
    },
    // 设置辅助线
    setAssistLineTipTime(timeString) {
      this.states.assistTipTime = timeString
    },
    setAssistLineActive(type) {
      this.states.assistLineActive = type
      if (!type) {
        this.setAssistLineTipTime('')
      }
    },
    getTasks(onlyChanged = true) {
      if (onlyChanged) {
        const tasks = this.states.tasks.filter(task => task.is_drag_changed || task.is_row_index_changed)
        return _.cloneDeep(tasks)
      }
      return _.cloneDeep(this.states.tasks)
    },
    // 下面是现在还没用的
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
