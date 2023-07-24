import Vue from "vue"
import _ from "lodash"

export default Vue.extend({
    data() {
        return {
            states: {
                formData: {}, // 表单的默认数据
                formSchema: [], // 预览和提交时需要的结构
                pluginsSchema: [], // 面板上的结构
                index: 0,
            },
        }
    },
    methods: {
        // 添加面板结构
        addPluginSchema(pluginSchema, index) {
            index = index || this.states.pluginsSchema.length
            this.states.pluginsSchema.splice(index, 0, pluginSchema)
        },
        addPluginSchemaToLine(pluginSchema, lineIndex) {
            this.states.pluginsSchema[lineIndex].push(pluginSchema)
        },
        // 根据 pluginsSchema 生成提交结构
        generateFormSchema() {
            this.states.index = 0
            this.states.formSchema = []
            this.states.pluginsSchema.forEach((pluginSchema, upIndex) => {
                if (Array.isArray(pluginSchema)) {
                    // 空行先不处理数据结构
                    if (pluginSchema.length) {
                        pluginSchema.forEach((item) => {
                            const plugin = this.checkPluginSchemaRepeat(this.states.formSchema, item)
                            if (!this.states.formSchema[upIndex]) {
                                this.states.formSchema[upIndex] = []
                            }
                            this.states.formSchema[upIndex].push(plugin.construct)
                        })
                    }
                } else {
                    const plugin = this.checkPluginSchemaRepeat(this.states.formSchema, pluginSchema)
                    this.states.formSchema.push(plugin.construct)
                }
            })
            this.generateFormData()
        },
        // check plugin schema repeat 并 获取新的 plugin schema
        checkPluginSchemaRepeat(formSchemas, pluginSchema) {
            const schemas = _.cloneDeep(formSchemas).flat()
            const plugin = _.cloneDeep(pluginSchema)

            schemas.forEach((schema) => {
                // 重复的属性名
                if (schema.prop === plugin.construct.prop) {
                    plugin.construct.prop += this.states.index++
                }
            })
            return plugin
        },
        // 根据 formSchema 生成默认数据表单
        generateFormData() {
            this.states.formData = {}
            const formSchema = _.cloneDeep(this.states.formSchema)
            formSchema.forEach((item) => {
                // 只有一行行多个时是数组
                if (Array.isArray(item)) {
                    item.forEach((childItem) => {
                        this.setFormData(this.states.formData, childItem)
                    })
                } else {
                    this.setFormData(this.states.formData, item)
                }
            })
        },
        // set form data
        setFormData(dataObject, schemaItem) {
            // 某些插件不需要设置默认值
            if (["button"].includes(schemaItem.plugin)) {
                return
            }
            // 设置的默认值
            const prop = schemaItem.prop
            dataObject[prop] = schemaItem.defaultValue
        },
    },
})
