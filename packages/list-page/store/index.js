// import Vue from 'vue';
import Watcher from "./watcher"

Watcher.prototype.mutations = {
    // 更新搜索数据
    initScheme(states, { search, pages, table }) {
        states.search = search
        states.pages = pages
        states.table = table
    },
}

Watcher.prototype.commit = function (name, ...args) {
    const mutations = this.mutations
    if (mutations[name]) {
        mutations[name].apply(this, [this.states].concat(args))
    } else {
        throw new Error(`Action not found: ${name}`)
    }
}

// 更新y轴滚动
// Watcher.prototype.updateTableScrollY = function() {
//   Vue.nextTick(this.table.updateScrollY);
// };

export default Watcher
