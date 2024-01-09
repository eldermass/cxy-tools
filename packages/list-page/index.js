import listPage from "./list-page.vue"
import Vue from "vue"

listPage.install = (Vue) => {
    Vue.component(listPage.name, listPage)
}

listPage.registerPlugins = function (...Comp) {
    // if is $listPagePlugins is not exist
    if (!Vue.prototype.$listPagePlugins) {
        Vue.prototype.$listPagePlugins = {}
    }

    // map component name
     Comp.forEach((item) => {
        // register plugins
        Vue.prototype.$listPagePlugins[item.name] = item
    })

}

export default listPage
