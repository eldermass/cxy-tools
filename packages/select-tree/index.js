import SelectTree from './index.vue'

SelectTree.install = Vue => {
    Vue.component(SelectTree.name, SelectTree)
}

export default SelectTree