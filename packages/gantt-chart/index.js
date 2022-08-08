import ganttChart from './gantt-chart.vue'

ganttChart.install = Vue => {
    Vue.component(ganttChart.name, ganttChart)
}

export default ganttChart