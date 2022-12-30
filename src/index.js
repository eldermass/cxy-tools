import ganttChart from "../packages/gantt-chart/index"
import gantNext from "../packages/gantt-next/index"

const components = [ganttChart, gantNext]

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

export default {
    ganttChart,
    gantNext,
    install,
}
