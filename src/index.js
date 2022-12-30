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

console.log(
    `%c Gantt %c V1.0.0 `,
    'padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060; font-weight: bold;',
    'padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;',
)

export default {
    ganttChart,
    gantNext,
    install,
}
