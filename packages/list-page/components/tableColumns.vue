<template>
    <!-- 如果隐藏 -->
    <div v-if="item.hide"></div>
    <!-- 插槽 -->
    <el-table-column v-else-if="item.slotName" :align="item.align || 'center'" :label="item.title" :width="item.width"
        :min-width="item.minWidth" :prop="item.prop" :show-overflow-tooltip="withDefault(item.show_overflow_tooltip, true)"
        :sortable="withDefault(item.sortable, true)" header-align="center">
        <template slot-scope="scope">
            <slot :name="item.slotName" :row="scope.row" :index="scope.$index" />
        </template>
    </el-table-column>
    <!-- 字典 -->
    <el-table-column v-else-if="item.options" :align="item.align || 'center'" :label="item.title" :width="item.width"
        :min-width="item.minWidth" :prop="item.prop" :show-overflow-tooltip="withDefault(item.show_overflow_tooltip, true)"
        :sortable="withDefault(item.sortable, true)" header-align="center">
        <template slot-scope="scope">
            <span>{{ scope.row[item.prop] | valueToLabel(item.options) }}</span>
        </template>
    </el-table-column>
    <!-- 默认 -->
    <el-table-column v-else :align="item.align || 'center'" :label="item.title" :width="item.width"
        :min-width="item.minWidth" :prop="item.prop" :show-overflow-tooltip="withDefault(item.show_overflow_tooltip, true)"
        :sortable="withDefault(item.sortable, true)" header-align="center" />
</template>

<script>
export default {
    name: 'table-columns',
    props: {
        item: {
            type: Object,
            default: () => { }
        },
    },
    filters: {
        valueToLabel(value, options) {
            if (!options) return value
            const option = options.find(item => item.value === value)
            return option ? option.label : value
        },
    },
    methods: {
        withDefault(val, defaultVal) {
            return val === undefined ? defaultVal : val
        }
    }
}
</script>