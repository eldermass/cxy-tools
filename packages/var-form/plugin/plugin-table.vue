<template>
    <el-table :data="storeFormData[schema.prop]" style="width: 100%" :border="schema.border">
        <template v-for="(item, index) in schema.tableHeaders">
            <el-table-column :key="index" :align="item.align || 'center'" :label="item.label" :min-width="item.width || 100"
                :prop="item.prop" show-overflow-tooltip header-align="center">
                <template v-slot="scope">
                    <common-item :row="scope.row" :store="store" :schema="item" />
                </template>
            </el-table-column>
        </template>
    </el-table>
</template>

<script>
import commonItem from '../common-item.vue';
import { mapStates } from '../store/helper';

export default {
    name: 'plugin-table',
    components: {
        commonItem
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
    },
    computed: {
        ...mapStates({ storeFormData: 'formData' })
    },
}
</script>