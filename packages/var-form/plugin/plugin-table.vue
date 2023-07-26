<template>
    <el-table :data="storeFormData[schema.prop]" style="width: 100%" :border="schema.border">
        <template v-for="(item, index) in schema.tableHeaders">
            <el-table-column :key="index" :align="item.align || 'center'" :label="item.label" :width="item.width || 'auto'"
                :prop="item.prop" show-overflow-tooltip header-align="center">
                <template v-slot="scope">
                    <common-item :row="scope.row" :store="store" :schema="item" />
                </template>
            </el-table-column>
        </template>
        <template slot="empty">
            <img style="height: 20px; width: 20px; vertical-align: sub; cursor: pointer;" @click="addRow({})"
                src="../assets/add.png" alt="">
            <span>添加数据</span>
        </template>
        <el-table-column fixed="right" align="center" label="操作" width="100">
            <template v-slot="scope">
                <el-button @click="addRow(scope.row)" type="text" size="small">增加</el-button>
                <el-button @click="deleteRow(scope.$index)" style="color: red;" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>

    </el-table>
</template>

<script>
import commonItem from '../common-item.vue';
import { mapStates } from '../store/helper';
import _ from 'lodash';

export default {
    name: 'plugin-table',
    components: {
        commonItem
    },
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
        return {}
    },
    computed: {
        ...mapStates({ storeFormData: 'formData' })
    },
    methods: {
        addRow(row) {
            // console.log(row)
            if (Array.isArray(this.storeFormData[this.schema.prop])) {
                this.storeFormData[this.schema.prop].push(_.cloneDeep(row))
            }
        },
        deleteRow(index) {
            // console.log(index);
            if (Array.isArray(this.storeFormData[this.schema.prop])) {
                this.storeFormData[this.schema.prop].splice(index, 1)
            }
        }
    },
}
</script>