<template>
    <el-button :type="schema.type" :size="schema.size || 'mini'" v-loading="clicking"  @click="handleClick">
        {{ schema.label }}
    </el-button>
</template>

<script>
export default {
    name: 'plugin-button',
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
        return {
            clicking: false
        }
    },
    methods: {
        handleClick() {
            if (this.schema.callback) {
                this.clicking = true
                this.schema.callback(this.store.getFormData(), () => {
                    this.clicking = false
                })
            }
        }
    },
}
</script>