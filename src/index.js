import gantNext from "../packages/gantt-next/index"
import varForm from "../packages/var-form/index"
import varFormEditor from "../packages/var-form-editor"

const components = [gantNext, varForm, varFormEditor]

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
    `%c CXY %c V1.1.5 %c https://www.npmjs.com/package/cxy-tools`,
    "padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060; font-weight: bold;",
    "padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;",
    "background: #ffffff; padding: 2px 0;"
)

export { varForm, gantNext, varFormEditor }

export default {
    gantNext,
    varForm,
    varFormEditor,
    install,
}
