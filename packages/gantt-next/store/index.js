// import Vue from 'vue';
import Watcher from './watcher'

Watcher.prototype.mutations = {
  setDaysList(states, list) {
    states.daysList = list.slice()
  },

  setTimeNow(states, nowTime) {
    states.nowTime = nowTime
  },

  setScrollY(states, scrollY, maxScrollHeight) {
    states.scrollY = scrollY
    states.maxScrollHeight = maxScrollHeight
  },

  updateTask(states, taskId, startDate, duration) {
    const task = states.tasks.find(task => task.task_id === taskId)
    if (!task) return
    task.is_drag_changed = true
    startDate && (task.start_date = startDate)
    duration && (task.duration = duration)
  },

  setDayBoxWidth(states, width) {
    states.dayBoxWidth = width
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
