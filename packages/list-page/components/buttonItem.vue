<template>
    <virtual-component v-if="button" :vnodes="vnodes" />
</template>

<script>
import colButton from '../../buttons/index.vue'
import plugins from '../plugins/index.js'

export default {
    name: 'button-item',
    components: {
        // eslint-disable-next-line vue/no-unused-components
        colButton,
        "virtual-component": {
            functional: true,
            render(h, ctx) {
                return ctx.props.vnodes(h)
            }
        }
    },
    props: {
        store: {
            type: Object,
            required: true
        },
        button: {
            type: [String, Object],
            default: () => ({})
        },
        refresh: {
            type: Function,
            default: () => { }
        },
        currentRow: {
            type: Object,
            default: () => ({})
        },
        multipleSelection: {
            type: Array,
            default: () => []
        },
        size: {
            type: String,
            default: 'mini'
        }
    },
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
        vnodes(h) {
            // 如果button是string，直接渲染预设组件
            // if (typeof this.button === 'string') {
            //     return this.renderPresetButton(h)
            // }

            // 如果 component 是 string, 直接渲染内置组件
            if (typeof this.button.component === 'string') {
                return this.renderButton(h)
            } else if (typeof this.button.component === 'function') {
                // 如果 component 是 render函数，按照 render 函数渲染
                return this.button.component(h)
            }
        },
        renderButton(h) {
            // 如果存在预设组件
            if (Object.hasOwnProperty.call(plugins, this.button.component)) {
                // console.log('存在预设组件: ', this.button.component)
                return h(plugins[this.button.component], {
                    props: {
                        store: this.store,
                        button: this.button,
                        currentRow: this.currentRow,
                        multipleSelection: this.multipleSelection,
                        refresh: this.refresh,
                        size: this.size
                    }
                })
            }
            // 没有匹配到预设组件时
            return h(this.button.component, {
                props: {
                    type: 'primary',
                    size: this.size,
                    ...this.button.props
                },
                on: {
                    click: this.handleClick
                }
            }, this.button.title)
        },
        handleClick() {
            this.button.opration && this.button.opration({
                button: this.button,
                currentRow: this.currentRow,
                multipleSelection: this.multipleSelection,
                refresh: this.refresh
            })
        }
    }
}
</script>