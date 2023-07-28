<template>
    <div v-if="showValue" class="plugin-prue-text" :style="schema.style || {}">
        <span>{{ showValue }}</span>
    </div>
</template>

<script>
import { mapStates } from '../store/helper';

export default {
    name: 'plugin-prue-text',
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
        ...mapStates({ storeFormData: 'formData' }),
        showValue() {
            return this.storeFormData[this.schema.prop] || this.schema.fixedValue
        }
    },
}
</script>

<style lang="scss" scoped>
.plugin-prue-text {
    text-align: center;
    font-weight: bold;
    margin: 5px 0;
}
</style>