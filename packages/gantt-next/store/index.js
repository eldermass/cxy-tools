// import Vue from 'vue';
import _ from 'lodash'
import Watcher from './watcher'

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

  updateTask(states, taskId, startDate, duration, endDate) {
    const task = states.tasks.find(task => task.task_id === taskId)
    if (!task) return
    task.is_drag_changed = true
    startDate && (task.start_date = startDate)
    duration && (task.duration = duration)
    endDate && (task.end_date = endDate)
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
