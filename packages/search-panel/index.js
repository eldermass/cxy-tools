import SearchPanel from './index.vue'

SearchPanel.install = Vue => {
    Vue.component(SearchPanel.name, SearchPanel)
}

export default SearchPanel