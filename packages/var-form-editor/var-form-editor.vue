<template>
    <div class='var-form-editor'>
        <plugins-panel class="plugins-panel" :store="store">
            <span class="panel-title">
                插件面板
            </span>
        </plugins-panel>
        <div class="form-preview" droppable @dragover="e => { e.preventDefault(); }"
            @drop="e => { console.log('drop: ', e) }">
            form-preview
        </div>
        <props-panel class="props-panel">
            <span class="panel-title">
                属性面板
            </span>
        </props-panel>
    </div>
</template>

<script>
import { createStore } from "./store/helper"
import pluginsPanel from "./plugins-panel/index.vue";
import propsPanel from "./props-panel/index.vue";

export default {
    name: "var-form-editor",
    components: {
        pluginsPanel, propsPanel
    },
    data() {
        this.store = createStore(this, {
            formData: {},
            formSchema: [1, 2, 3],
        })
        return {};
    }
}
</script>
<style lang="scss" scoped>
* {
    box-sizing: border-box;
}

.var-form-editor {
    height: 100%;
    padding: 0 200px;
    position: relative;
    border: 1px solid #ccc;

    .plugins-panel {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 200px;
        // border: 1px solid palevioletred;
    }

    .form-preview {
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        height: 100%;
    }

    .props-panel {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 200px;
        // border: 1px solid yellowgreen;
    }

    .panel-title {
        display: block;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        color: #333;
        border-bottom: 1px solid #ccc;
    }
}
</style>
