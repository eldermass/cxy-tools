<template>
    <el-form-item v-if="!schema.hide" :label="schema.label" :prop="schema.prop">
        <common-item :schema="schema" :store="store" :row="storeFormData" />
    </el-form-item>
</template>

<script>
import commonItem from '../common-item.vue'
import { mapStates } from '../store/helper';

export default {
    name: 'plugin-form-item',
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