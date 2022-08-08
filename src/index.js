import ganttChart from "../packages/gantt-chart/index"

const components = [ganttChart]

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
    install,
}
