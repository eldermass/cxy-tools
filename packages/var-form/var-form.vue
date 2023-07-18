<template>
    <el-form class='var-form' label-width="100px">
        <!-- 按行的表单项 -->
        <el-row v-for="(schemaItem, index) in schema" :key="index">
            <template v-if="isSchemaArray(schemaItem)">
                <var-form-item v-for="(spiltSchema, index) in schemaItem" :key="index"
                    :span="Math.floor(24 / schemaItem.length)" :schema="spiltSchema" :store="store" />
            </template>
            <template v-else>
                <var-form-item :schema="schemaItem" :store="store" />
            </template>
        </el-row>
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
        }
    },
    data() {
        this.store = createStore(this, {
            formData: this.formData,
            formSchema: this.schema
        })
        return {}
    },
    computed: {
        ...mapStates({ storeFormData: 'formData', storeFormSchema: 'formSchema' })
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
        setFormData(formData) {
            this.store.setFormData(formData)
        },
        updateFormData(key, value) {
            this.store.updateFormData(key, value)
        },
        getSchema() {
            return _.cloneDeep(this.storeFormSchema)
        },
        getDataAndSchema() {
            return {
                formData: this.getFormData(),
                formSchema: this.getSchema()
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.var-form {
    padding: 10px;
    box-sizing: border-box;
}
</style>