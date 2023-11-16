<template>
    <div id="app">
        <el-button-group style="margin-bottom: 5px;">
            <el-button size="mini" @click="changeDemo(1)" type="primary">gant chart</el-button>
            <el-button size="mini" @click="changeDemo(2)" type="primary">var Form</el-button>
            <el-button size="mini" @click="changeDemo(3)" type="primary">form Editor</el-button>
            <el-button size="mini" @click="changeDemo(4)" type="primary">list page</el-button>
        </el-button-group>
        <gant-demo v-if="showName === 'gant'"></gant-demo>
        <demo-form v-if="showName === 'form'"></demo-form>
        <demo-form-editor v-if="showName === 'form-editor'"></demo-form-editor>
        <demo-list-page v-if="showName === 'list-page'"></demo-list-page>
    </div>
</template>

<script>
import './main.js'
import GantDemo from './demo/gant.vue'
import DemoForm from './demo/demo-form.vue'
import DemoFormEditor from './demo/form-editor.vue'
import DemoListPage from './demo/demo-list-page.vue'

export default {
    name: "App",
    components: {
        GantDemo, DemoForm, DemoFormEditor, DemoListPage
    },
    data() {
        return {
            // showName: 'gant'
            // showName: 'form'
            showName: 'form-editor'
        }
    },
    mounted() {
        this.showByLocationSearch()
    },
    methods: {
        changeDemo(id) {
            window.location.search = `?id=${id}`
        },
        showByLocationSearch() {
            const search = window.location.search

            switch (search) {
                case '?id=1':
                    this.showName = 'gant'
                    break;
                case '?id=2':
                    this.showName = 'form'
                    break;
                case '?id=3':
                    this.showName = 'form-editor'
                    break;
                case '?id=4':
                    this.showName = 'list-page'
                    break;
                default:
                    break;
            }
        }
    },

}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 80px 0 0 100px;
    height: 700px;
    width: 1400px;

    /* height: 100vh;
    width: 100vw; */
    p {
        margin: 0;
        color: #aaa;
    }
}

body {
    margin: 0;
    padding: 0;
}
</style>
