<template>
    <transition name="fade2" mode="out-in" appear>
        <div v-if="tableEditorVisible" class='table-prop-editor'>
            <div class="title">
                列：{{ row.label }} --- {{ row.prop }}
            </div>

            <el-form ref="formRef" :model="row" label-width="100px">
                <el-form-item v-if="row.prop.startsWith(`valid_`)" label="验证函数">
                    <el-input v-model="row.defaultValue" type="textarea" :rows="9"
                        placeholder="(prop: string, value: string, row: { prop: value... }) => Boolean" />
                </el-form-item>
                <el-form-item label="双击事件">
                    <el-input v-model="row.onDblClick" type="textarea" rows="6"
                        placeholder="async (row, exFuncs) => { 
    const name = await exFuncs.getUserName()
    this.$set(row, 'a', name)
}" />
                </el-form-item>
                <el-form-item label="change事件">
                    <el-input v-model="row.onChange" type="textarea" rows="6"
                        placeholder="async (row, exFuncs) => { 
    const name = await exFuncs.getUserName()
    this.$set(row, 'a', name)
}" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`debounceTime`)" label="input防抖时长">
                    <el-input v-model="row.debounceTime" placeholder="200 ms" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`onBindInput`)" label="input 事件">
                    <el-input v-model="row.onBindInput" type="textarea" rows="6"
                        placeholder="async (row, exFuncs) => { 
    const name = await exFuncs.getUserName()
    this.$set(row, 'a', name)
}" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`modalSearch`)" label="弹窗查询">
                    <el-input v-model="row.modalSearch" type="textarea" rows="6"
                        placeholder="async (row, funcs) => { 
    console.log('search-input: ', row, funcs)
    let res = await funcs.openDialog('requestUrl')
    console.log('res: ', res)
    this.$set(row, 'searchInput', res.address)
    this.$set(row, 'name1', res.name)
}" />
                </el-form-item>
                <el-form-item v-if="couldEditProp(`optionSource`)" label="选项数据源">
                    <el-input v-model="row.optionSource" placeholder="{ data: [{ label: '选项1', value: 1 }] }" />
                </el-form-item>

                <el-form-item v-if="couldEditProp(`fixedValue`)" label="HTML固定值">
                    <el-input v-model="row.fixedValue" placeholder="html 超文本" />
                </el-form-item>

                <el-form-item v-if="couldEditProp(`autocomputed`)" label="自动计算">
                    <el-input v-model="row.autocomputed" type="textarea" rows="9" placeholder="挂载时执行，可参照下三个示例
(row, fn) => { fn.add('a', 'b') } // a+b=当前格
(row, fn) => { fn.min('a', 'b', 'e') } // a-b=e,e可不填
async (row, fn) => { let user = await fn.exFuncs.getUserName(); console.log(user); }
(row) => { this.$set(row, 'd', Number(row.a) * Number(row.b)) }
                    " />
                </el-form-item>

                <el-form-item v-if="couldEditProp(`options`)" label="选项组">
                    <el-table border :data="row.options" style="width: 100%">
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
export default {
    name: "table-prop-editor",
    props: {
        schema: {
            type: Object,
        }
    },
    data() {
        return {
            tableEditorVisible: false
        };
    },
    computed: {

    },
    methods: {
        show(row) {
            this.$set(row, "onDblClick", row.onDblClick || "")
            // 判断是否可编辑，并设置响应式属性
            const shouldShows = ["checkbox", "radio", "select"]
            const shouldShows2 = ["html", "input"]
            if (!shouldShows.concat(shouldShows2).includes(row.type) && !row.prop.startsWith("valid_")) {
                this.$message.warning("该类型不支持编辑")
                return
            }

            if (row.prop.startsWith("valid_")) {
                this.$set(row, "defaultValue", row.defaultValue || "")
            }

            if (row.type === "html") {
                this.$set(row, "fixedValue", row.fixedValue || "")
            }

            // 如果是 input 类型，需要设置 autocomputed
            if (row.type === "input") {
                this.$set(row, "autocomputed", row.autocomputed || "")
                this.$set(row, "modalSearch", row.modalSearch || "")
                this.$set(row, "onBindInput", row.onBindInput || "")
                this.$set(row, "debounceTime", row.debounceTime || "")
            } else {
                delete row.autocomputed
            }

            if (shouldShows.includes(row.type)) {
                this.$set(row, "optionSource", row.optionSource || "")
                this.$set(row, "options", row.options || [])
            }

            this.tableEditorVisible = true;
            // 引用
            this.row = row;
        },
        hide() {
            this.tableEditorVisible = false;
        },
        save() {
            // options 二选一
            if (this.row.optionSource) {
                this.row.options = undefined
            }
            this.hide();
        },
        couldEditProp(prop) {
            return Object.keys(this.row).includes(prop)
        },
        handleDelOption(index) {
            this.row.options.splice(index, 1)
        },
        handleAddOption() {
            this.row.options.push({ label: '', value: '' })
        },
    }
}
</script>
<style lang="scss" scoped>
.table-prop-editor {
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

.fade2-enter-active,
.fade2-leave-active {
    transition-property: opacity, right;
    transition-duration: .5s;
    // transition: opacity .5s;
}

.fade2-enter,
.fade2-leave-to {
    opacity: 0;
    right: -100px;
}
</style>
