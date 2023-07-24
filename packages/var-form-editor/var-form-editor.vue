<template>
    <div class='var-form-editor'>
        <plugins-panel class="plugins-panel" :store="store">
            <span class="panel-title">
                插件面板
            </span>
        </plugins-panel>
        <div class="form-preview">
            <preview-panel :store="store" />
        </div>
        <props-panel class="props-panel" :store="store">
            <span class="panel-title">
                布局面板
            </span>
        </props-panel>
    </div>
</template>

<script>
import { createStore } from "./store/helper"
import pluginsPanel from "./plugins-panel/index.vue";
import propsPanel from "./props-panel/index.vue";
import previewPanel from "./preview-panel/index.vue";

export default {
    name: "var-form-editor",
    components: {
        pluginsPanel, propsPanel, previewPanel
    },
    data() {
        this.store = createStore(this, {
            pluginsSchema: [{ "id": 2, "name": "输入框", "plugin": "form-item", "construct": { "plugin": "form-item", "type": "input", "label": "文本", "prop": "testValue", "defaultValue": "", "placeholder": "请输入", "disabled": false } }, [{ "id": 3, "name": "数字", "plugin": "form-item", "construct": { "plugin": "form-item", "type": "input-number", "label": "数字", "prop": "propNumber" } }, { "id": 5, "name": "下拉框", "plugin": "form-item", "construct": { "plugin": "form-item", "type": "select", "label": "选择", "prop": "propSelect", "multiple": true, "optionSource": "http://10.10.2.201:8881/api/modalinfo/1/" } }], { "id": 11, "name": "表格", "plugin": "table", "construct": { "plugin": "table", "type": "input", "prop": "propTable", "defaultValue": [], "border": true, "tableHeaders": [{ "label": "名称", "prop": "name", "width": "150", "align": "center", "type": "text" }, { "label": "地点", "prop": "address", "width": "150", "align": "center", "type": "input" }, { "label": "状态", "prop": "status", "type": "switch" }, { "label": "国家", "prop": "country", "type": "checkbox", "options": [{ "label": "中国", "value": 1 }, { "label": "俄罗斯", "value": 2 }] }] } }]
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
