import Button from './index.vue'

Button.install = Vue => {
    Vue.component(Button.name, Button)
}

export default Button