<template>
    <el-select :value="valueTitle" :size="size" :placeholder="placeholder" :disabled="disabled" :clearable="clearable"
        @clear="clearHandle" :filterable="filterable" :filter-method="filterMethod" ref="treeSelect">
        <el-option :value="valueTitle" :label="valueTitle" class="options">
            <el-tree id="tree-option" ref="selectTree" :accordion="accordion" :data="options" :props="props"
                :node-key="props.value" :show-checkbox="multiple" :default-expanded-keys="defaultExpandedKey"
                :filter-node-method="filterNode" @node-click="handleNodeClick" @check="handleCheckChange">
            </el-tree>
        </el-option>
    </el-select>
</template>


<script>
export default {
    name: "cxy-tree",
    props: {
        /* 配置项 */
        props: {
            type: Object,
            default: () => ({
                value: 'id',             // ID字段名
                label: 'title',         // 显示名称
                children: 'children'    // 子级字段名
            })
        },
        // 尺寸
        size: {
            type: String,
            default: 'mini'
        },
        // 是否可搜索
        filterable: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: '请选择.'
        },
        // 是否多选
        multiple: {
            type: Boolean,
            default: false
        },
        /* 选项列表数据(树形结构的对象数组) */
        options: {
            type: Array,
            default: () => []
        },
        /* 初始值 */
        value: {
            type: [Number, Array],
            default: null
        },
        /* 可清空选项 */
        clearable: {
            type: Boolean,
            default: true
        },
        /* 手风琴效果 */
        accordion: {
            type: Boolean,
            default: false
        },
        // 是否只包含叶子节点
        leafOnly: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            filterText: '',
            valueId: this.value,    // 初始值
            valueIds: this.value,   // 多选初始值
            valueTitle: '', // 初始显示
            defaultExpandedKey: []
        }
    },
    mounted() {
        this.initHandle()
    },
    methods: {
        // 初始化值
        initHandle(isChange = false) {
            // 如果是单选
            if (!this.multiple) {
                const node = this.$refs.selectTree.getNode(this.valueId || 0)
                if (!node) return

                this.valueTitle = node.data[this.props.label]     // 初始化显示
                this.$refs.selectTree.setCurrentKey(this.valueId)       // 设置默认选中
                this.defaultExpandedKey = [this.valueId]      // 设置默认展开
            } else {
                if (isChange) return // 如果是第二次更改，不需要初始化选中

                if (!this.valueIds || !Array.isArray(this.valueIds)) return

                this.valueTitle = ''
                this.valueIds.forEach(id => {
                    const node = this.$refs.selectTree.getNode(id || 0)
                    if (!node) return
                    this.defaultExpandedKey.push(id) // 设置默认展开
                    this.$refs.selectTree.setChecked(id, true, true) // 设置默认选中
                    this.valueTitle += node.data[this.props.label] + ','
                })
                this.valueTitle = this.valueTitle.slice(0, -1) // 去除最后一个逗号
            }

            this.initScroll()
        },
        // 初始化滚动条
        initScroll() {
            this.$nextTick(() => {
                let scrollWrap = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')[0]
                let scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
                scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
                scrollBar.forEach(ele => ele.style.width = 0)
            })
        },
        // 单选时候点击节点
        handleNodeClick(node) {
            // 多选时不对单选节点进行操作
            if (this.multiple) {
                return
            }
            this.valueTitle = node[this.props.label]
            this.valueId = node[this.props.value]
            this.$emit('input', this.valueId)
            this.$emit('change', this.valueId, node)
            this.defaultExpandedKey = []

            // 选择叶子节点时，关闭下拉框
            if (!node.children || !node.children.length) {
                this.$refs.treeSelect.blur()
            }
        },
        // 复选时，勾选内容
        handleCheckChange(data, checked) {
            let checkedNodes = checked.checkedNodes
            let checkedKeys = checked.checkedKeys
            if (this.leafOnly) {
                checkedNodes = checkedNodes.filter(item => !item.children || !item.children.length)
                checkedKeys = checkedNodes.map(item => item[this.props.value])
            }

            this.valueTitle = checkedNodes.map(item => item[this.props.label]).join(',')
            this.valueIds = checkedKeys
            this.$emit('input', checkedKeys)
            this.$emit('change', checkedKeys, checkedNodes)
            this.defaultExpandedKey = []
        },
        // 清除选中
        clearHandle() {
            this.valueTitle = ''
            this.valueId = null
            this.defaultExpandedKey = []
            this.clearSelected()
            this.$emit('input', null)
            this.$emit('change', [], [])

            if (this.multiple) {
                this.$refs.selectTree.setCheckedKeys([]) // 清空选中
            }
        },
        /* 清空选中样式 */
        clearSelected() {
            let allNode = document.querySelectorAll('#tree-option .el-tree-node')
            allNode.forEach((element) => element.classList.remove('is-current'))
        },
        filterNode(value, data) {
            if (!value) return true;
            return data[this.props.label].indexOf(value) !== -1;
        },
        filterMethod(filterText) {
            this.filterText = filterText
        }
    },
    watch: {
        value() {
            this.valueId = this.value
            this.valueIds = this.value || []
            this.initHandle(true)
        },
        filterText(val) {
            this.$refs.selectTree.filter(val)
        }
    },
};
</script>

<style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
    height: auto;
    max-height: 274px;
    padding: 0;
    overflow: hidden;
    overflow-y: auto;
}

.el-select-dropdown__item.selected {
    font-weight: normal;
}

ul li>>>.el-tree .el-tree-node__content {
    height: auto;
    padding: 0 20px;
}

.el-tree-node__label {
    font-weight: normal;
}

.el-tree>>>.is-current .el-tree-node__label {
    color: #409EFF;
    font-weight: 700;
}

.el-tree>>>.is-current .el-tree-node__children .el-tree-node__label {
    color: #606266;
    font-weight: normal;
}

.selectInput {
    padding: 0 5px;
    box-sizing: border-box;
}
</style>
