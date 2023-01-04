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
