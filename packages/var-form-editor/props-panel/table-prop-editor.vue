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
                <el-form-item v-if="couldEditProp(`optionSource`)" label="选项数据源">
                    <el-input v-model="row.optionSource" />
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
            const shouldShows = ["checkbox", "radio", "select"]
            if (!shouldShows.includes(row.type) && !row.prop.startsWith("valid_")) {
                this.$message.warning("该类型不支持编辑")
                return
            }

            if (row.prop.startsWith("valid_")) {
                row.defaultValue = row.defaultValue || ""
            }

            if (shouldShows.includes(row.type)) {
                row.optionSource = row.optionSource || ""
                row.options = row.options || []
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
    right: 0;
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
