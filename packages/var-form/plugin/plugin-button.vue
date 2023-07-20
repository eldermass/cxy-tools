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
            if (!this.schema.callback) return
            // 如果传递的是函数，则直接执行
            if (typeof this.schema.callback === 'function') {
                this.clicking = true
                this.schema.callback(this.store.getFormData(), this.store.getExternalFuncs(), () => {
                    this.clicking = false
                })
            }

            // 如果传递的是字符串，则eval执行
            if (typeof this.schema.callback === 'string') {
                try {
                    const callback = eval(`(${this.schema.callback})`)
                    this.clicking = true
                    callback(this.store.getFormData(), this.store.getExternalFuncs(), () => {
                        this.clicking = false
                    })
                } catch (error) {
                    console.error("按钮 callback 函数解析失败，请检查函数！");
                }
            }
        }
    },
}
</script>