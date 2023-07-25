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
            pluginsSchema: [[{ "id": 2, "name": "输入框", "plugin": "form-item", "construct": { "plugin": "form-item", "type": "input", "label": "文本", "prop": "propInput", "defaultValue": "", "placeholder": "请输入", "disabled": false } }, { "id": 3, "name": "数字", "plugin": "form-item", "construct": { "plugin": "form-item", "type": "input-number", "label": "数字", "prop": "propNumber", "disabled": false } }], { "id": 4, "name": "文本域", "plugin": "form-item", "construct": { "plugin": "form-item", "type": "input-textarea", "rows": 3, "label": "文本", "prop": "propTextarea", "placeholder": "请输入", "disabled": false } }, [{ "id": 6, "name": "日期", "plugin": "form-item", "construct": { "plugin": "form-item", "type": "date-picker", "dateType": "date", "label": "日期", "placeholder": "yyyy-mm-dd HH:ii:ss 格式", "prop": "propDate", "defaultValue": "", "disabled": false } }, { "id": 7, "name": "时间", "plugin": "form-item", "construct": { "plugin": "form-item", "type": "time-picker", "label": "时间", "prop": "propTime", "defaultValue": "", "disabled": false, "placeholder": "HH:ii:ss 格式" } }, { "id": 8, "name": "开关", "plugin": "form-item", "construct": { "plugin": "form-item", "type": "switch", "label": "开关", "prop": "propSwitch", "defaultValue": false, "disabled": false } }], [{ "id": 5, "name": "下拉框", "plugin": "form-item", "construct": { "plugin": "form-item", "type": "select", "label": "选择", "prop": "propSelect", "defaultValue": "", "placeholder": "请选择", "disabled": false, "multiple": true, "optionSource": "", "options": [{ "label": "选项1", "value": 1 }, { "label": "选项2", "value": 2 }] } }, { "id": 9, "name": "单选框", "plugin": "form-item", "construct": { "plugin": "form-item", "type": "radio", "label": "单选框", "prop": "propRadio", "defaultValue": "", "disabled": false, "optionSource": "", "options": [{ "label": "男", "value": 1 }, { "label": "女", "value": 2 }] } }, { "id": 10, "name": "多选框", "plugin": "form-item", "construct": { "plugin": "form-item", "type": "checkbox", "label": "多选框", "prop": "propCheckbox", "defaultValue": [], "disabled": false, "optionSource": "", "options": [{ "label": "中国", "value": 1 }, { "label": "俄罗斯", "value": 2 }] } }], { "id": 11, "name": "表格", "plugin": "table", "construct": { "plugin": "table", "type": "input", "prop": "propTable", "defaultValue": [], "border": true, "tableHeaders": [{ "label": "名称", "prop": "name", "width": "150", "align": "center", "type": "text" }, { "label": "地点", "prop": "address", "width": "150", "align": "center", "type": "input" }, { "label": "状态", "prop": "status", "type": "switch" }, { "label": "国家", "prop": "country", "type": "checkbox", "options": [{ "label": "中国", "value": 1 }, { "label": "俄罗斯", "value": 2 }] }] } }, [{ "id": 13, "name": "按钮", "plugin": "button", "construct": { "plugin": "button", "colorType": "primary", "label": "按钮1", "prop": "propButton", "size": "normal", "callback": "(data, funcs,  done) => {\n                console.log(\"click button 前面一个: \", data, funcs)\n                setTimeout(() => {\n                    done()\n                }, 1000)\n            }" } }, { "id": 13, "name": "按钮", "plugin": "button", "construct": { "plugin": "button", "colorType": "danger", "label": "按钮1", "prop": "propButton", "size": "normal", "callback": "(data, funcs,  done) => {\n                console.log(\"click button: 后面一个 \", data, funcs)\n                setTimeout(() => {\n                    done()\n                }, 1000)\n            }" } }]]
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
