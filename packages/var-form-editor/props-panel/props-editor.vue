<template>
    <transition name="fade" mode="out-in" appear>
        <div v-if="editorVisible" class='props-editor'>
            <div class="title">
                插件：{{ plugin.plugin }} --- {{ plugin.name }}
            </div>
            <el-form ref="formRef" :model="construct" label-width="100px">
                <el-form-item v-if="couldEditProp(`prop`)" label="属性名">
                    <el-input v-model="construct.prop" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`label`)" label="标签">
                    <el-input v-model="construct.label" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`size`)" label="尺寸">
                    <el-input v-model="construct.size" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`height`)" label="高度">
                    <el-input v-model="construct.height" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`dateType`)" label="日期类型">
                    <!-- <el-input v-model="construct.dateType" /> -->
                    <el-select v-model="construct.dateType" placeholder="请选择">
                        <el-option label="日期" value="date"></el-option>
                        <el-option label="日期时间" value="datetime"></el-option>
                        <el-option label="年" value="year"></el-option>
                        <el-option label="月" value="month"></el-option>
                        <el-option label="周" value="week"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="couldEditProp(`rows`)" label="行数">
                    <el-input-number v-model="construct.rows" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`colorType`)" label="颜色类型">
                    <el-input v-model="construct.colorType" placeholder="同 el-button 的type" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`defaultValue`) && construct.plugin !== `table`" label="默认值">
                    <el-input v-model="construct.defaultValue" placeholder="默认值用于生成默认data，并不会存储到结构中。多选时,分隔" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`placeholder`)" label="占位符">
                    <el-input v-model="construct.placeholder" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`fixedValue`)" label="固定值">
                    <el-input v-model="construct.fixedValue" type="textarea" :rows="3" placeholder="数据无值时展示，支持html解析" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`style`)" label="CSS样式">
                    <el-input v-model="construct.style" type="textarea" placeholder="color: black; text-align: left;"
                        :rows="9" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`hide`)" label="隐藏">
                    <el-switch v-model="construct.hide" active-color="#13ce66" inactive-color="#ff4949" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`disabled`)" label="是否禁用">
                    <el-switch v-model="construct.disabled" active-color="#13ce66" inactive-color="#ff4949" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`multiple`)" label="是否多选">
                    <el-switch v-model="construct.multiple" active-color="#13ce66" inactive-color="#ff4949" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`border`)" label="显示边框">
                    <el-switch v-model="construct.border" active-color="#13ce66" inactive-color="#ff4949" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`borderColor`)" label="边框颜色">
                    <el-input v-model="construct.borderColor" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`callback`)" label="回调函数">
                    <el-input v-model="construct.callback" type="textarea" :rows="5" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`rules`)" label="验证规则">
                    <el-input v-model="construct.rules" type="textarea" :rows="9" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`optionSource`)" label="选项数据源">
                    <el-input v-model="construct.optionSource"
                        placeholder="当填写该项时，选项组将无效。 { data: [{ label: '选项1', value: 1 }] }" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`onDblClick`)" label="双击事件">
                    <el-input v-model="construct.onDblClick" type="textarea" rows="6"
                        placeholder="async (row, exFuncs) => { 
    const name = await exFuncs.getUserName()
    this.$set(row, 'a', name)
}" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`modalSearch`)" label="弹窗查询">
                    <el-input v-model="construct.modalSearch" type="textarea" rows="6"
                        placeholder="async (row, funcs) => { 
    console.log('search-input: ', row, funcs)
    let res = await funcs.openDialog('requestUrl')
    console.log('res: ', res)
    this.$set(row, 'searchInput', res.address)
    this.$set(row, 'name1', res.name)
}" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`options`)" label="选项组">
                    <el-table border :data="construct.options" style="width: 100%">
                        <el-table-column prop="label" label="标签" width="auto">
                            <template v-slot="scope">
                                <el-input size="mini" v-model="scope.row.label" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="value" label="值" width="auto">
                            <template v-slot="scope">
                                <el-input size="mini" v-model="scope.row.value" />
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template v-slot="scope">
                                <el-button @click="handleAddOption" type="text" size="small">添加</el-button>
                                <el-button @click="handleDelOption(scope.$index)" type="text" style="color: red"
                                    size="small">删除</el-button>
                            </template>
                        </el-table-column>
                        <template slot="empty">
                            <div @click="handleAddOption" style=" cursor: pointer;">
                                <img style="height: 20px; width: 20px; vertical-align: sub;"
                                    src="../../var-form/assets/add.png" alt="">
                                <span>添加数据</span>
                            </div>
                        </template>
                    </el-table>
                </el-form-item>

                <el-form-item v-if="couldEditProp(`apiSource`)" label="表格数据源">
                    <el-input v-model="construct.apiSource" />
                </el-form-item>

                <el-form-item v-if="couldEditProp(`refreshSource`)" label="内容刷新源">
                    <el-input v-model="construct.refreshSource" />
                </el-form-item>

                <el-form-item v-if="couldEditProp(`tableHeaders`)" label="表格头">
                    <el-table border :data="construct.tableHeaders" style="width: 100%">
                        <el-table-column prop="label" label="标签" width="100">
                            <template v-slot="scope">
                                <el-input size="mini" v-model="scope.row.label" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="prop" label="属性" width="100">
                            <template v-slot="scope">
                                <el-input size="mini" v-model="scope.row.prop" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="width" label="宽度" width="80">
                            <template v-slot="scope">
                                <el-input size="mini" v-model="scope.row.width" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="hide" label="隐藏" width="65">
                            <template v-slot="scope">
                                <el-switch v-model="scope.row.hide" size="mini" active-color="#13ce66"
                                    inactive-color="#ff4949" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="autocomplete" label="自动填充" width="78">
                            <template v-slot="scope">
                                <el-switch v-model="scope.row.autocomplete" size="mini" active-color="#13ce66"
                                    inactive-color="#ff4949" />
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="align" label="对其" width="auto">
                            <template v-slot="scope">
                                <el-input size="mini" v-model="scope.row.align" />
                            </template>
                        </el-table-column> -->
                        <el-table-column prop="type" label="类型" width="auto">
                            <template v-slot="scope">
                                <!-- <el-input size="mini" v-model="scope.row.type" /> -->
                                <el-select size="mini" v-model="scope.row.type" placeholder="请选择">
                                    <el-option label="文本" value="text"></el-option>
                                    <el-option label="HTML" value="html"></el-option>
                                    <el-option label="输入框" value="input"></el-option>
                                    <el-option label="数字" value="input-number"></el-option>
                                    <el-option label="下拉框" value="select"></el-option>
                                    <el-option label="日期" value="date-picker"></el-option>
                                    <el-option label="时间" value="time-picker"></el-option>
                                    <el-option label="开关" value="switch"></el-option>
                                    <el-option label="单选框" value="radio"></el-option>
                                    <el-option label="多选框" value="checkbox"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template v-slot="scope">
                                <el-button @click="handleAddTableHeader" type="text" size="small">添加</el-button>
                                <el-button @click="handleEditTableHeaderProp(scope.row)" type="text"
                                    style="color: rgb(50, 205, 107)" size="small">编辑</el-button>
                                <el-button @click="handleDelTableHeader(scope.$index)" type="text" style="color: red"
                                    size="small">删除</el-button>
                            </template>
                        </el-table-column>
                        <template slot="empty">
                            <div @click="handleAddTableHeader" style=" cursor: pointer;">
                                <img style="height: 20px; width: 20px; vertical-align: sub;"
                                    src="../../var-form/assets/add.png" alt="">
                                <span>添加数据</span>
                            </div>
                        </template>
                    </el-table>
                </el-form-item>

                <el-form-item>
                    <el-button @click="hide">取 消</el-button>
                    <el-button type="primary" @click="save">保 存</el-button>
                </el-form-item>
            </el-form>
            <i class="el-icon-close" @click="hide"></i>
            <!-- <table-prop-editor ref="tablePropEditor" /> -->
        </div>
    </transition>
</template>

<script>
import _ from 'lodash'
// import tablePropEditor from './table-prop-editor.vue';

export default {
    name: "props-editor",
    // components: { tablePropEditor },
    props: {
        store: {
            required: true
        }
    },
    data() {
        return {
            rowIndex: undefined,
            colIndex: undefined,
            plugin: {},
            editorVisible: false,
            construct: {}
        };
    },
    methods: {
        show(plugin, rowIndex, colIndex) {
            this.editorVisible = true;
            // 设置数据
            this.plugin = plugin;
            this.rowIndex = rowIndex;
            this.colIndex = colIndex;
            this.construct = _.cloneDeep(plugin.construct);
            // 如果默认值是数组，需要转换成字符串
            if (this.construct.defaultValue && Array.isArray(this.construct.defaultValue)) {
                this.construct.defaultValue = this.construct.defaultValue.join(',')
            }
        },
        hide() {
            this.editorVisible = false;
        },
        couldEditProp(prop) {
            return Object.keys(this.construct).includes(prop)
        },
        save() {
            const plguin = this.plugin
            const construct = _.cloneDeep(this.construct)

            //  options 和 optionSource,优选 optionSource
            if (['select', 'radio', 'checkbox'].includes(construct.type)) {
                if (construct.options && construct.options.length > 0) {
                    construct.optionSource = undefined
                }
            }

            // defaultValue 需要根据 options 和 multiple 生成
            if (construct.type === 'select') {
                if (construct.multiple) {
                    construct.defaultValue = construct.defaultValue.split(',')
                }
            }
            // switch 的 defaultValue 需要根据输入判断
            if (construct.type === 'switch') {
                construct.defaultValue = construct.defaultValue === 'true'
            }
            // radio 的 defaultValue 需要根据 options 生成,
            // 约定值都是字符串

            // checkbox 的 defaultValue 需要根据 options 生成
            if (construct.type === 'checkbox') {
                construct.defaultValue = construct.defaultValue.split(',')
            }
            // table 里 defaultValue 需要根据 tableHeaders 生成，table 中的选项或源数据
            if (construct.plugin === 'table') {
                construct.defaultValue = this.getDefaultTableHeader(construct)
            }
            console.log('save 时，需要额外处理默认值', construct);
            // 函数里实现了深度克隆
            plguin.construct = construct
            this.store.updatePluginSchema(plguin, this.rowIndex, this.colIndex)
            this.hide();
        },
        handleDelOption(index) {
            this.construct.options.splice(index, 1)
        },
        handleAddOption() {
            this.construct.options.push({ label: '', value: '' })
        },
        handleDelTableHeader(index) {
            this.construct.tableHeaders.splice(index, 1)
        },
        handleAddTableHeader() {
            this.construct.tableHeaders.push({ label: '', prop: '', width: '', align: '', type: '', autocomplete: false })
        },
        handleEditTableHeaderProp(row) {
            // this.$refs.tablePropEditor.show(row)
            this.$emit('editor-table', row)
        },
        handleUpdateTableHeader() {
            console.log('handleUpdateTableHeader');
            // this.construct.tableHeaders.splice(index, 1)
        },
        // 设置默认的 table 单行默认数据
        getDefaultTableHeader(construct) {
            const defaultArray = []
            const rowOne = {}
            // 遍历 headers 并赋予默认值
            construct.tableHeaders.forEach(item => {
                if (!item.prop) return
                // 先赋予 字符串
                rowOne[item.prop] = ''
                // input-number 是数字
                if (item.type === 'input-number') {
                    rowOne[item.prop] = 0
                }
                // switch 是布尔值
                if (item.type === 'switch') {
                    rowOne[item.prop] = false
                }
                // checkbox 是数组
                if (item.type === 'checkbox') {
                    rowOne[item.prop] = []
                }
                // select 且 multiple 是数组
                if (item.type === 'select' && item.multiple) {
                    rowOne[item.prop] = []
                }
                // valid_ 开头的是验证
                if (item.prop.startsWith('valid_')) {
                    rowOne[item.prop] = item.defaultValue
                }
            })

            defaultArray.push(rowOne)
            return _.cloneDeep(defaultArray)
        }
    },
}
</script>
<style lang="scss" scoped>
.props-editor {
    position: absolute;
    top: 0;
    right: 201px;
    width: 800px;
    height: 100%;
    padding: 15px;
    z-index: 1000;
    box-sizing: border-box;
    border-left: 1px solid #ccc;
    background: white;
    text-align: left;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }

    .title {
        margin-bottom: 10px;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
    }

    .el-icon-close {
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition-property: opacity, right;
    transition-duration: .5s;
    // transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
    right: 0;
}

::v-deep(.el-table__header) {
    line-height: 16px !important;
}
</style>
