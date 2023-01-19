// import Vue from 'vue';
import _ from 'lodash'
import Watcher from './watcher'
import dayjs from 'dayjs'

Watcher.prototype.mutations = {
  setDaysList(states, list) {
    states.daysList = list.slice()
  },

  setTimeNow(states, nowTime) {
    states.nowTime = nowTime
  },

  setTitleGroups(states, titles) {
    states.titleGroups = titles
  },

  setRows(states, rows) {
    states.rows = rows
  },

  setTasks(states, tasks) {
    states.tasks = tasks
  },

  setLinks(states, links) {
    states.originLinks = links
    states.links = []
  },

  setScrollY(states, scrollY, maxScrollHeight) {
    states.scrollY = scrollY
    states.maxScrollHeight = maxScrollHeight
  },

  updateTask(states, taskId, startDate, duration, endDate, newRowIndex) {
    const task = states.tasks.find(task => task.task_id === taskId)
    const origin_task = _.cloneDeep(task)
    if (!task) return
    task.is_drag_changed = true
    startDate && (task.start_date = startDate)
    duration && (task.duration = duration)
    endDate && (task.end_date = endDate)

    // 改变行
    if (newRowIndex !== undefined && newRowIndex > -1 && newRowIndex < states.rows.length) {
      const row_info = states.rows[newRowIndex]
      task.is_row_index_changed = true
      task.row_index = newRowIndex
      task.row_info = row_info
    }
    const isCross = isTimeCross(task, states.tasks)
    // console.log(isCross ? '相交' : '不相交')
    // 相交时重置改变项
    if (isCross) {
      delete task.is_drag_changed
      delete task.is_row_index_changed
      delete task.row_info
      task.start_date = origin_task.start_date
      task.duration = origin_task.duration
      task.end_date = origin_task.end_date
      task.row_index = origin_task.row_index
    }
    // 回调通知改变
    if (typeof states.handleTaskChangeFn === 'function') {
      states.handleTaskChangeFn(_.cloneDeep(task))
    }
  },

  changeTaskItem(states, task_id, changeObj = {}) {
    let task = states.tasks.find(task => task.task_id === task_id)
    if (!task) return
    delete task.is_drag_changed

    task = Object.assign(task, changeObj)
  },

  setDayBoxWidth(states, width) {
    states.dayBoxWidth = width
  },

  setAdsorbType(states, type) {
    states.adsorbType = type
  },

  listenTaskDbClick(states, fn) {
    states.handleTaskDbClickFn = fn
  },

  listenTaskChange(states, fn) {
    states.handleTaskChangeFn = fn
  }
};

Watcher.prototype.commit = function(name, ...args) {
  const mutations = this.mutations;
  if (mutations[name]) {
    mutations[name].apply(this, [this.states].concat(args));
  } else {
    throw new Error(`Action not found: ${name}`);
  }
};

// 更新y轴滚动
// Watcher.prototype.updateTableScrollY = function() {
//   Vue.nextTick(this.table.updateScrollY);
// };

export default Watcher;

// 不相交返回 false
function isTimeCross(task, all_tasks) {
  const same_lines = all_tasks.filter(item => task.row_index === item.row_index)
  // 只有自己
  if (same_lines.length === 1) return

  // 按开始时间排序
  const sort_lines = same_lines.sort((a, b) => dayjs(a.start_date).diff(b.start_date))
  const self_index = sort_lines.findIndex(item => item.task_id === task.task_id)

  const before_task = sort_lines[self_index - 1]
  const after_task = sort_lines[self_index + 1]
  // 最后一个
  if (self_index === sort_lines.length - 1) {
    const diff = dayjs(before_task.start_date).add(before_task.duration * 24 * 60, 'minute').diff(task.start_date)
    return diff > 0
  }
  // 第一个
  if (self_index === 0) {
    const diff = dayjs(task.end_date).diff(after_task.start_date)
    return diff > 0
  }
  // 在中间
  const diffLeft = dayjs(before_task.start_date).add(before_task.duration * 24 * 60, 'minute').diff(task.start_date)
  const diffRight = dayjs(task.end_date).diff(after_task.start_date)
  return diffLeft > 0 || diffRight > 0
}