<template>
    <div id="demo-gant">
        <gantt-next ref="gantt" :titles="titles" :tasks="tasks" :links="links" :rows="rows" :days="30"
            :oDayBoxWidth="60" :start_time="'2023-01-04'" :rightMenulists="rightMenulists"
            @task-dbclick="handleTaskClick" @task-change="handleTaskChange" @task-change-error="handleTaskChangeError"
            :adsorbType="1" @menu-insert="hanldeMenuInstert" @menu-lock="hanldeMenuLock"/>
        <el-button @click="getData" type="primary" style="margin-top: 10px;">获取数据</el-button>
        <el-button @click="setBoxWidth(15)" type="primary" style="margin-top: 10px;">设置周视图</el-button>
        <el-button @click="setBoxWidth(120)" type="primary" style="margin-top: 10px;">设置日视图</el-button>
        <el-button @click="changeTaskTime" type="primary" style="margin-top: 10px;">改变时间</el-button>
        <div class="tips">
            tips:
            <p>ctrl + shift + s 配置</p>
            <p>ctrl + 滚轮 缩放</p>
            <p>alt + 滚轮 横向滚动</p>
        </div>
    </div>
</template>

<script>
// import ganttChart from "./components/gantt-chart.vue"
import mockList, { titleGroups, tasks, links } from "../../mocks/gantt-chart"
import dayjs from 'dayjs'

export default {
    name: "App",
    // components: {
    //     ganttChart,
    // },
    data() {
        return {
            rows: mockList.slice(8),
            titles: titleGroups.slice(2),
            tasks: tasks.slice(6),
            links: links.slice(5),
            rightMenulists: [
                {
                    fnName: "lock",
                    params: {},
                    icoName: "el-icon-download",
                    btnName: "锁 定",
                    type: 'clicktask',
                    // divided: true,
                    // disabled: true,
                    // children: [],
                },
                {
                    fnName: "insert",
                    params: {},
                    icoName: "el-icon-download",
                    btnName: "插 单",
                    type: 'default',
                    // divided: true,
                    // disabled: true,
                    // children: [],
                }
            ]
        }
    },
    mounted() {
        window.dayjs = dayjs
        setTimeout(() => {
            this.titles = titleGroups
            this.rows = mockList
            this.tasks = tasks
            this.links = links
        }, 1000);
    },
    methods: {
        handleTaskClick(data) {
            console.log('双击任务:  ', data)
        },
        handleTaskChange(task, origin_task) {
            console.log('改变任务', task, origin_task)
        },
        getData() {
            // 默认变化过的
            const data = this.$refs.gantt.getData()
            console.log(data)
        },
        setBoxWidth(width = 60) {
            this.$refs.gantt.setDayBoxWidth(width)
        },
        changeTaskTime() {
            this.$refs.gantt.changeTaskItem(this.tasks[5].task_id, { duration: 5 })
        },
        handleTaskChangeError(task, origin_task, type) {
            console.log('error ' + type, task, origin_task)
        },
        hanldeMenuInstert(params) {
            console.log('insert', params)
        },
        hanldeMenuLock(params) {
            console.log('lock: ', params)
        }
    },
}
</script>