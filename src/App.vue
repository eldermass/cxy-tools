<template>
    <div id="app">
        <gantt-next ref="gantt" :titles="titles" :tasks="tasks" :links="links" :rows="rows" :days="50"
            :oDayBoxWidth="18" :start_time="'2023-01-04'" @task-dbclick="handleTaskClick"
            @task-change="handleTaskChange" />
        <el-button @click="getData" type="primary" style="margin-top: 10px;">获取数据</el-button>
        <el-button @click="setBoxWidth" type="primary" style="margin-top: 10px;">设置宽度</el-button>
        <el-button @click="changeTaskTime" type="primary" style="margin-top: 10px;">改变时间</el-button>
    </div>
</template>

<script>
// import ganttChart from "./components/gantt-chart.vue"
import mockList, { titleGroups, tasks, links } from "../mocks/gantt-chart"

export default {
    name: "App",
    // components: {
    //     ganttChart,
    // },
    data() {
        return {
            rows: mockList,
            titles: titleGroups,
            tasks,
            links
        }
    },
    methods: {
        handleTaskClick(data) {
            console.log('双击任务:  ', data.start_date)
        },
        handleTaskChange(task) {
            console.log('改变任务', task)
        },
        getData() {
            // 默认变化过的
            const data = this.$refs.gantt.getData(false)
            console.log(data)
        },
        setBoxWidth() {
            this.$refs.gantt.setDayBoxWidth(120)
        },
        changeTaskTime() {
            this.$refs.gantt.changeTaskItem(this.tasks[5].task_id, { duration: 5 })
        }
    },
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 100px 0 0 100px;
    height: 600px;
    width: 1200px;
    /* height: 100vh;
    width: 100vw; */
}

body {
    margin: 0;
    padding: 0;
}
</style>
