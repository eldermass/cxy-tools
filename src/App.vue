<template>
    <div id="app">
        <gant-demo v-if="showName === 'gant'"></gant-demo>
        <demo-form v-if="showName === 'form'"></demo-form>
        <demo-form-editor v-if="showName === 'form-editor'"></demo-form-editor>
    </div>
</template>

<script>
import './main.js'
import GantDemo from './demo/gant.vue'
import DemoForm from './demo/demo-form.vue'
import DemoFormEditor from './demo/form-editor.vue'

export default {
    name: "App",
    components: {
        GantDemo, DemoForm, DemoFormEditor
    },
    data() {
        return {
            // showName: 'gant'
            // showName: 'form'
            showName: 'form-editor'
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
    margin: 100px 0 0 100px;
    height: 600px;
    width: 1200px;

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
