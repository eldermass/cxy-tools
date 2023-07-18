// import Vue from 'vue';
// import _ from 'lodash'
import Watcher from "./watcher"

Watcher.prototype.mutations = {
    setFormData(states, formData) {
        states.formData = formData
    },

    listenSubmit(states, fn) {
        states.listenSubmitFn = fn
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

export default Watcher
