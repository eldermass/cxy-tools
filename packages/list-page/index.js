import listPage from './list-page.vue'

listPage.install = Vue => {
    Vue.component(listPage.name, listPage)
}

export default listPage