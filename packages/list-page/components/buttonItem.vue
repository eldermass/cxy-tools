<template>
    <virtual-component v-if="button" :vnodes="vnodes" />
</template>

<script>

import colButton from '../../buttons/index.vue'
import exportButton from '../../buttons/export-button.vue'

export default {
    name: 'button-item',
    components: {
        // eslint-disable-next-line vue/no-unused-components
        colButton, "btn-export": exportButton,
        "virtual-component": {
            functional: true,
            render(h, ctx) {
                return ctx.props.vnodes(h)
            }
        }
    },
    props: {
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
    },
    data() {
        return {
        }
    },
    computed: {
        isSelected() {
            return this.multipleSelection.length > 0
        },
        isSingleSelected() {
            return this.multipleSelection.length === 1
        },
        isMultiSelected() {
            return this.multipleSelection.length > 1
        }
    },
    mounted() {
    },
    methods: {
        vnodes(h) {
            // 如果button是string，直接渲染预设组件
            if (typeof this.button === 'string') {
                return this.renderPresetButton(h)
            }

            // 如果 component 是 string, 直接渲染内置组件
            if (typeof this.button.component === 'string') {
                return this.renderButton(h)
            } else if (typeof this.button.component === 'function') {
                // 如果 component 是 render函数，按照 render 函数渲染
                return this.button.component(h)
            }
        },
        // 预设组件
        renderPresetButton(h) {
            switch (this.button) {
                case 'delete':
                    return h("col-button", {
                        props: {
                            size: 'mini',
                            title: "删除",
                        },
                        attrs: {
                            type: 'danger',
                            icon: "delete",
                            disabled: !this.isSelected
                        },
                        on: {
                            click: this.handleDelete
                        }
                    })
            }
        },
        renderButton(h) {
            switch (this.button.component) {
                case 'add':
                    return h("col-button", {
                        props: {
                            size: 'mini',
                            title: "新增",
                        },
                        attrs: {
                            type: 'primary',
                            icon: "plus",
                            disabled: !this.isSingleSelected
                        },
                        on: {
                            click: this.handleAdd
                        }
                    })
                case 'edit':
                    return h("col-button", {
                        props: {
                            size: 'mini',
                            title: "修改",
                        },
                        attrs: {
                            type: 'warning',
                            icon: "edit",
                            disabled: !this.isSingleSelected
                        },
                        on: {
                            click: this.handleEdit
                        }
                    })
                case 'export':
                    return h("btn-export", {
                        props: {
                            size: 'mini',
                            title: "导出",
                        },
                        attrs: {
                            type: 'primary',
                            icon: "el-icon-download",
                        }
                    })
            }

            // 没有匹配到预设组件时
            const name = this.button.component
            const title = this.button.title
            return h(name, {
                props: {
                    type: 'primary',
                    size: 'mini'
                },
                on: {
                    click: this.handleClick
                }
            }, title)
        },
        handleClick() {
            console.log('handleClick', this.button.title)
            console.log('currentRow', this.currentRow)
            console.log('multipleSelection', this.multipleSelection)
            this.refresh && this.refresh()
        },
        handleAdd() {
            console.log('handleAdd')
        },
        handleEdit() {
            console.log('handleEdit')
        },
        handleDelete() {
            console.log('handleDelete')
        },
    }
}
</script>