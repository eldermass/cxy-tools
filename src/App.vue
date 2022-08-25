<template>
    <div id="app">
        <gantt-chart :data-list="outData" :days="50" :start_timestamp="new Date('2022-08-01').getTime()" @item-click="handleClick" @item-drop="handleDrop" />
    </div>
</template>

<script>
// import ganttChart from "./components/gantt-chart.vue"
import mockData from "../packages/gantt-chart/data-struct"

export default {
    name: "App",
    // components: {
    //     ganttChart,
    // },
    data() {
        return {
            outData: mockData,
        }
    },
    methods: {
        handleClick(data) {
            console.log(data)
            this.$message.success('收到了数据:  ' + data.title)
        },
        handleDrop(newItem) {
            console.log(newItem)
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
