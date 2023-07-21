<template>
    <el-col v-if="schema.prop" class="var-form-item" v-bind="$attrs">
        <!-- 表单 item -->
        <template v-if="schema.plugin === 'form-item'">
            <plugin-form-item :schema="schema" :store="store" />
        </template>

        <!-- 表单 -->
        <template v-else-if="schema.plugin === 'form'">
            <plugin-form :schema="schema" :store="store" />
        </template>

        <!-- 表格 -->
        <template v-else-if="schema.plugin === 'table'">
            <plugin-table :schema="schema" :store="store" />
        </template>

        <!-- 按钮 -->
        <template v-else-if="schema.plugin === 'button'">
            <plugin-button :schema="schema" :store="store" />
        </template>

        <!-- 错误提示 -->
        <template v-else>
            <div>
                组件 {{ schema.plugin }} 未定义
            </div>
        </template>
    </el-col>
</template>

<script>
import pluginFormItem from './plugin/plugin-form-item.vue';
import pluginTable from './plugin/plugin-table.vue'
import pluginButton from './plugin/plugin-button.vue'
import pluginForm from './plugin/plugin-form.vue';

export default {
    name: 'var-form-item',
    components: {
        pluginFormItem,
        pluginTable,
        pluginButton,
        pluginForm
    },
    props: {
        store: {
            required: true
        },
        schema: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped>
.var-form-item {
    margin-top: 10px!important;
}
</style>