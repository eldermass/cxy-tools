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
        // 添加 pluginsSchema 结构
        addPluginSchema(pluginSchema, index) {
            if (pluginSchema.plugin === "validate-rules") {
                const find = this.states.pluginsSchema.find((item) => item.plugin === "validate-rules")
                if (find) {
                    this.$message.warning("表单验证只能有一个")
                    return
                }
            }

            index = index || this.states.pluginsSchema.length
            this.states.pluginsSchema.splice(index, 0, _.cloneDeep(pluginSchema))
        },
        // 添加 pluginsSchema 结构到某一行
        addPluginSchemaToLine(pluginSchema, lineIndex) {
            this.states.pluginsSchema[lineIndex].push(_.cloneDeep(pluginSchema))
        },
        // 获取 pluginsSchema 中的某一行某列
        getPluginSchema(index, childIndex) {
            let returnSchema
            if (childIndex !== undefined) {
                returnSchema = this.states.pluginsSchema[index][childIndex]
            } else {
                returnSchema = this.states.pluginsSchema[index]
            }
            return _.cloneDeep(returnSchema)
        },
        // 更新 pluginsSchema 中的某一行某列
        updatePluginSchema(pluginSchema, index, childIndex) {
            // eslint-disable-next-line no-debugger
            // debugger
            if (childIndex !== undefined) {
                this.$set(this.states.pluginsSchema[index], childIndex, _.cloneDeep(pluginSchema))
                // this.states.pluginsSchema[index][childIndex] = _.cloneDeep(pluginSchema)
            } else {
                this.$set(this.states.pluginsSchema, index, _.cloneDeep(pluginSchema))
                // this.states.pluginsSchema[index] = _.cloneDeep(pluginSchema)
            }
        },
        // 删除 pluginsSchema
        deletePluginSchema(index, childIndex) {
            if (childIndex !== undefined) {
                this.states.pluginsSchema[index].splice(childIndex, 1)
            } else {
                this.states.pluginsSchema.splice(index, 1)
            }
        },
        // 根据 pluginsSchema 生成 formSchema
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
        // 去重并生成 plugin 放到 formSchema 中
        checkPluginSchemaRepeat(formSchemas, pluginSchema) {
            const schemas = _.cloneDeep(formSchemas).flat().filter(Boolean)
            const plugin = _.cloneDeep(pluginSchema)

            schemas.forEach((schema) => {
                // 重复的属性名
                if (schema.prop === plugin.construct.prop) {
                    plugin.construct.prop += this.states.index++
                }
            })
            return plugin
        },
        // 根据 formSchema 生成 formData
        generateFormData() {
            this.states.formData = {}
            const formSchema = _.cloneDeep(this.states.formSchema)
            formSchema.forEach((item) => {
                if (!item) return
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
        // 设置 formData
        setFormData(dataObject, schemaItem) {
            // 某些插件不需要设置默认值
            if (["button", "validate-rules"].includes(schemaItem.plugin)) {
                return
            }
            // 设置的默认值
            const prop = schemaItem.prop
            dataObject[prop] = schemaItem.defaultValue
        },
        // 根据 formSchema 生成 typeData，给后端用
        generateTypeData() {
            const formSchema = _.cloneDeep(this.states.formSchema)
            const typeData = []
            formSchema.forEach((item) => {
                if (!item) return
                // 只有一行行多个时是数组
                if (Array.isArray(item)) {
                    item.forEach((childItem) => {
                        this.setTypeData(typeData, childItem)
                    })
                } else {
                    this.setTypeData(typeData, item)
                }
            })
            return typeData
        },
        // 设置 typeData
        setTypeData(typeData, schemaItem) {
            // 某些插件不需要设置解析结构
            if (["button", "validate-rules"].includes(schemaItem.plugin)) {
                return
            }

            const typeItem = {}
            // 设置的默认值
            typeItem.prop = schemaItem.prop
            typeItem.dataType = getDataType(schemaItem)

            // 有子表
            if (schemaItem.plugin === "table") {
                typeItem.dataType = "table"
                typeItem.apiSource = schemaItem.apiSource
                typeItem.refreshSource = schemaItem.refreshSource
                typeItem.children = schemaItem.tableHeaders.map((header) => {
                    return {
                        prop: header.prop,
                        dataType: getDataType(header),
                    }
                })
            }

            typeData.push(typeItem)
        },
    },
})

function getDataType(schemaItem) {
    // 先赋予 字符串
    let dataType = "string"
    // input-number 是数字
    if (schemaItem.type === "input-number") {
        dataType = "int"
    }
    // datatime 是时间
    if (schemaItem.type === "date-picker" || schemaItem.type === "time-picker") {
        dataType = "datetime"
    }
    // switch 是布尔值
    if (schemaItem.type === "switch") {
        dataType = "boolean"
    }
    // checkbox 是数组
    if (schemaItem.type === "checkbox") {
        dataType = "array:string"
    }
    // select 且 multiple 是数组
    if (schemaItem.type === "select" && schemaItem.multiple) {
        dataType = "array:string"
    }
    return dataType
}
