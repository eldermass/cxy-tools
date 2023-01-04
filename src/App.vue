<template>
    <div id="app">
        <gantt-next ref="gantt" :data-list="outData" :titles="titles" :days="50"
            :start_timestamp="new Date('2023-01-04').getTime()" @item-click="handleClick" @item-drop="handleDrop" @drag-error="handleDragError" />
        <el-button @click="handleBtnClick" type="primary" style="margin-top: 10px;">获取数据</el-button>
    </div>
</template>

<script>
// import ganttChart from "./components/gantt-chart.vue"
import mockData from "../mocks/gantt-chart"

const titles = [
    {
        title: "2 号楼 1 楼SMT车间",
        length: 9
    },
    {
        title: "2 号楼 1 楼SMT车间",
        length: 5
    },
    {
        title: "2 号楼 1 楼SMT车间",
        length: 16
    }
]

export default {
    name: "App",
    // components: {
    //     ganttChart,
    // },
    data() {
        return {
            outData: mockData.concat(JSON.parse(JSON.stringify(mockData))),
            titles
        }
    },
    methods: {
        handleClick(data) {
            console.log(data)
            this.$message.success('收到了数据:  ' + data.title)
        },
        handleDrop(from, to) {
            console.log(from, to)
        },
        handleDragError(msg) {
            this.$message.error(msg)
        },
        handleBtnClick() {
            const data = this.$refs.gantt.getData()
            console.log(data)
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
    width: 1300px;
    /* height: 100vh;
    width: 100vw; */
}

body {
    margin: 0;
    padding: 0;
}
</style>
