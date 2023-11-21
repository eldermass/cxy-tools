<template>
    <el-popover v-model="visible" placement="bottom-end" trigger="hover" style="float: right" title="编辑列" width="210">
        <div style="text-align: center" v-if="tableShow">
            <el-table ref="table" :data="columns" row-key="tableTitleSE" style="width: 100%;" max-height="400"
                @current-change="handleCurrentRowChange" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="title" label="显示列名" width="150" />
            </el-table>
            <el-button style="margin-top: 10px;" type="primary" size="mini" @click="save">保存</el-button>
        </div>

        <el-button slot="reference" icon="el-icon-setting" size="mini" type="text">编辑列</el-button>
    </el-popover>
</template>

<script>
import selectMixins from '../mixins/selectRowMixin'
import Sortable from 'sortablejs'
import _ from 'lodash'

export default {
    name: 'column-edit',
    mixins: [selectMixins],
    props: {
        columns: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            columnList: [], // 跟随拖动变化，即实际变化后的数据
            tableShow: true,
            visible: false
        }
    },
    watch: {
        visible(state) {
            // 每次打开时重置表格
            if (!state) return

            this.tableShow = false
            setTimeout(() => {
                this.tableShow = true
                this.initData()
            }, 10)
        }
    },
    mounted() {
        this.initData()
    },

    methods: {
        initData() {
            // 先渲染数据，再初始化
            if (!this.$refs.table) {
                setTimeout(() => {
                    this.initData()
                }, 30)
                return
            }

            this.columnList = _.cloneDeep(this.columns)
            this.selectAll()
            this.initDrag()
        },
        selectAll() {
            this.$refs.table.toggleAllSelection()
        },
        initDrag() {
            const el = this.$refs.table.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
            Sortable.create(el, {
                animation: 180,
                onEnd: evt => {
                    const oldIndex = evt.oldIndex
                    const newIndex = evt.newIndex
                    console.log(`${oldIndex} moved to ${newIndex}`)
                    console.log(evt)

                    const item = this.columnList.splice(oldIndex, 1)[0]
                    this.columnList.splice(newIndex, 0, item)
                }
            })
        },
        save() {
            this.$emit('save', this.columnList)
            this.visible = false
        }
    }
}
</script>