import gantNext from "../packages/gantt-next/index"
import varForm from "../packages/var-form/index"

const components = [gantNext, varForm]

const install = function (Vue) {
    // console.log(opts)

    components.forEach((component) => {
        Vue.component(component.name, component)
    })
}

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue)
}

console.log(
    `%c CXY %c V1.1.2 `,
    "padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060; font-weight: bold;",
    "padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;"
)

export { varForm, gantNext }

export default {
    gantNext,
    varForm,
    install,
}
