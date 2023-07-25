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
                <el-form-item v-if="couldEditProp(`defaultValue`)" label="默认值">
                    <el-input v-model="construct.defaultValue" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`placeholder`)" label="占位符">
                    <el-input v-model="construct.placeholder" />
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
                <el-form-item v-if="couldEditProp(`callback`)" label="回调函数">
                    <el-input v-model="construct.callback" type="textarea" :rows="5" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`optionSource`)" label="数据源">
                    <el-input v-model="construct.optionSource" placeholder="当填写该项时，选项组将无效" />
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

                <el-form-item v-if="couldEditProp(`tableHeaders`)" label="表格头">
                    <el-table border :data="construct.tableHeaders" style="width: 100%">
                        <el-table-column prop="label" label="标签" width="auto">
                            <template v-slot="scope">
                                <el-input size="mini" v-model="scope.row.label" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="prop" label="属性" width="auto">
                            <template v-slot="scope">
                                <el-input size="mini" v-model="scope.row.prop" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="width" label="宽度" width="auto">
                            <template v-slot="scope">
                                <el-input size="mini" v-model="scope.row.width" />
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
        </div>
    </transition>
</template>

<script>
import _ from 'lodash'

export default {
    name: "props-editor",
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
                if (construct.options) {
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
            console.log('save 时，需要额外处理');
            // table 里 defaultValue 需要根据 tableHeaders 生成，table 中的选项或源数据

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
            this.construct.tableHeaders.push({ label: '', prop: '', width: '', align: '', type: '' })
        }
    },
}
</script>
<style lang="scss" scoped>
.props-editor {
    position: absolute;
    top: 0;
    right: 201px;
    width: 650px;
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
    ;
}
</style>
