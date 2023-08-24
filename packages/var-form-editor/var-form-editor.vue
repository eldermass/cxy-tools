<template>
    <div class='var-form-editor'>
        <plugins-panel class="plugins-panel" :store="store">
            <span class="panel-title">
                插件面板
            </span>
        </plugins-panel>
        <div class="form-preview">
            <preview-panel ref="preview" :external-funcs="externalFuncs" :store="store" />
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
import _ from "lodash";
import { plugins } from "./plugins.js";

export default {
    name: "var-form-editor",
    components: {
        pluginsPanel, propsPanel, previewPanel
    },
    props: {
        formSchema: {
            type: Array,
            default: () => []
        },
        formData: {
            type: Object,
            default: () => ({})
        },
        // 外部函数队列
        externalFuncs: {
            type: Object,
            default: () => ({})
        },
    },
    data() {
        this.store = createStore(this, {
            pluginsSchema: this.formSchemaToPluginSchema(this.formSchema),
            originData: _.cloneDeep(this.formData),
            outterFuncs: {
                getEditFormData: this.getEditFormData
            }
        })
        return {};
    },
    methods: {
        formSchemaToPluginSchema(formSchema) {
            if (!formSchema.length) return [];

            const pluginSchema = formSchema.map(schema => {
                let plugin = plugins.find(plugin => {
                    return plugin.plugin === schema.plugin && plugin.construct.type === schema.type
                })

                // 把已有的页面结构 转换成 插件的结构
                if (plugin) {
                    plugin = _.cloneDeep(plugin)
                    schema && (plugin.construct = schema)
                }

                return plugin
            }).filter(Boolean)

            return _.cloneDeep(pluginSchema)
        },
        // 默认数据
        getFormData() {
            return _.cloneDeep(this.store.states.formData)
        },
        getFormSchema() {
            return _.cloneDeep(this.store.states.formSchema)
        },
        getTypeData() {
            return this.store.generateTypeData()
        },
        // 编辑数据
        getEditFormData() {
            return this.$refs.preview.getEditFormData()
        },
    },
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
