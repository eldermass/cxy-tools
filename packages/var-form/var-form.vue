<template>
    <el-form ref="varForm" :model="storeFormData" class='var-form' :rules="varFormProp.rules" label-width="100px">
        <!-- 按行的表单项 -->
        <el-row v-for="(schemaItem, index) in schemas" :key="index" :class="{ 'row-border': varFormProp.border }"
            :style="{ '--border-color': varFormProp.borderColor }">
            <template v-if="isSchemaArray(schemaItem)">
                <var-form-item v-for="(spiltSchema, index) in schemaItem" :key="index"
                    :span="Math.floor(24 / schemaItem.length)" :schema="spiltSchema" :store="store"
                    :border="varFormProp.border" />
            </template>
            <template v-else>
                <var-form-item :schema="schemaItem" :store="store" :border="varFormProp.border" />
            </template>
        </el-row>
        <div v-if="editMode" class="edit-mode-tag">编辑模式</div>
    </el-form>
</template>

<script>
import varFormItem from './var-form-item.vue';
import { createStore, mapStates } from "./store/helper"
import _ from 'lodash'

export default {
    name: 'var-form',
    components: {
        varFormItem
    },
    props: {
        formData: {
            type: Object,
            default: () => ({})
        },
        schema: {
            type: [Object, Array],
            default: () => ({})
        },
        // 外部函数队列
        externalFuncs: {
            type: Object,
            default: () => ({})
        },
        // 编辑模式
        editMode: {
            type: Boolean,
            default: false
        }
    },
    data() {
        const schema = _.cloneDeep(this.schema)
        const ruleIndex = schema.findIndex(item => item.plugin === 'validate-rules')

        if (ruleIndex > -1) {
            schema.splice(ruleIndex, 1)
        }

        this.store = createStore(this, {
            formData: _.cloneDeep(this.formData),
            formSchema: schema,
            externalFuncs: this.externalFuncs,
            editMode: this.editMode
        })
        return {}
    },
    computed: {
        // 使用处理过后的 schema
        schemas() {
            const schema = _.cloneDeep(this.schema)
            // 使用 storeFormSchema 时，可以动态更新结构
            // const schema = this.storeFormSchema.length ? _.cloneDeep(this.storeFormSchema) : _.cloneDeep(this.schema)
            const ruleIndex = schema.findIndex(item => item.plugin === 'validate-rules')

            if (ruleIndex > -1) {
                schema.splice(ruleIndex, 1)
            }
            return schema
        },
        // 表单属性
        varFormProp() {
            const schema = this.schema
            const ruleIndex = schema.findIndex(item => item.plugin === 'validate-rules')
            let ret = {}

            if (ruleIndex > -1) {
                ret = _.cloneDeep(schema[ruleIndex])
                try {
                    ret.rules = JSON.parse(ret.rules)
                } catch (error) {
                    ret.rules = {}
                    console.error("validate-rules 格式错误, 请检查是否为标准JSON string格式！");
                }
            }

            return ret
        },
        ...mapStates({ storeFormData: 'formData', storeFormSchema: 'formSchema', validResults: 'validResults' })
    },
    methods: {
        // 判断 schemaItem 是否数组
        isSchemaArray(schemaItem) {
            return Array.isArray(schemaItem);
        },
        //  获取表单数据
        getFormData() {
            return _.cloneDeep(this.storeFormData)
        },
        // 设置表单数据
        setFormData(formData) {
            this.store.setFormData(formData)
        },
        // 更新表单数据
        updateFormData(key, value) {
            this.store.updateFormData(key, value)
        },
        // 获取表单结构
        getSchema() {
            return _.cloneDeep(this.storeFormSchema)
        },
        // 获取表单数据和结构
        getDataAndSchema() {
            return {
                formData: this.getFormData(),
                formSchema: this.getSchema()
            }
        },
        // 验证表单
        getValidateFormData() {
            return new Promise((resolve, reject) => {
                const pass = _.every(this.validResults, v => v === true)
                if (!pass) {
                    console.error("自定义函数验证不通过：", _.cloneDeep(this.validResults));
                    reject('failed')
                    return
                }
                this.$refs.varForm.validate((valid) => {
                    if (valid && pass) {
                        resolve(this.getFormData())
                    } else {
                        reject('failed')
                    }
                });
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.var-form {
    padding: 10px;
    box-sizing: border-box;
    text-align: left;
    position: relative;

    .edit-mode-tag {
        position: absolute;
        top: 0;
        right: 0;
        padding: 5px 10px;
        background-color: #409EFF;
        color: #fff;
        font-size: 12px;
        border-radius: 0 0 0 5px;
    }
}

.row-border {
    --border-color: #DCDFE6;
    border: 1px solid var(--border-color);

    &:not(:last-child) {
        border-bottom: none;
    }
}
</style>