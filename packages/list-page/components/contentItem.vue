<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div :class="['custom-item']">
        <!-- input 框 -->
        <template v-if="schema.type === 'input'">
            <el-input v-model="row[schema.prop]" :disabled="schema.disabled" :placeholder="schema.placeholder">
                <i v-if="schema.modalSearch" slot="suffix" class="el-input__icon el-icon-search" style="cursor: pointer;"
                    @click="handleModalSearch"></i>
            </el-input>
        </template>
        <!-- textarea 框 -->
        <template v-else-if="schema.type === 'input-textarea'">
            <el-input type="textarea" v-model="row[schema.prop]" :rows="schema.rows || 3" :disabled="schema.disabled"
                :placeholder="schema.placeholder" />
        </template>
        <!-- input 数字 -->
        <template v-else-if="schema.type === 'input-number'">
            <el-input-number v-model="row[schema.prop]" clearable :disabled="schema.disabled"
                :placeholder="schema.placeholder" />
        </template>
        <!-- select 下拉框 -->
        <template v-else-if="schema.type === 'select'">
            <el-select v-model="row[schema.prop]" :multiple="schema.multiple" filterable :disabled="schema.disabled"
                :placeholder="schema.placeholder">
                <el-option v-for="item in schema.options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </template>
        <!-- 时间选择器 date-picker -->
        <template v-else-if="schema.type === 'date-picker'">
            <el-date-picker v-model="row[schema.prop]" :type="schema.dateType || 'date'" :disabled="schema.disabled"
                value-format="yyyy-MM-dd HH:mm:ss" :placeholder="schema.placeholder" placement="bottom-start" />
        </template>
        <!-- 时间日期 time-picker -->
        <template v-else-if="schema.type === 'time-picker'">
            <el-time-picker v-model="row[schema.prop]" :disabled="schema.disabled" value-format="HH:mm:ss"
                :placeholder="schema.placeholder" placement="bottom-start" />
        </template>
        <!-- 开关 switch -->
        <template v-else-if="schema.type === 'switch'">
            <el-switch v-model="row[schema.prop]" :disabled="schema.disabled" active-color="#13ce66" />
        </template>
        <!-- 单选框 radio -->
        <template v-else-if="schema.type === 'radio'">
            <el-radio-group v-model="row[schema.prop]" :disabled="schema.disabled">
                <el-radio v-for="item in schema.options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
            </el-radio-group>
        </template>
        <!-- 多选框 checkbox -->
        <template v-else-if="schema.type === 'checkbox'">
            <el-checkbox-group v-model="row[schema.prop]" :disabled="schema.disabled">
                <el-checkbox v-for="item in schema.options" :key="item.value" :label="item.value">{{ item.label
                }}</el-checkbox>
            </el-checkbox-group>
        </template>
        <!-- html -->
        <template v-else-if="schema.type === 'html'">
            <div v-html="row[schema.prop] || schema.fixedValue" />
        </template>

        <!-- 显示文本 -->
        <template v-else-if="schema.type === 'text'">
            <span>{{ row[schema.prop] }}</span>
        </template>

        <template v-else>
            <div>
                没有定义 type：{{ schema.type }}
            </div>
        </template>
    </div>
</template>

<script>

export default {
    name: 'common-item',
    props: {
        schema: {
            type: Object,
            default: () => ({})
        },
        row: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
        }
    }
}
</script>

<style lang="scss" scoped></style>