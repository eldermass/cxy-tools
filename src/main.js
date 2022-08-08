import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import Tools from "./index"
// console.log(ganttChart)
Vue.use(Tools)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
