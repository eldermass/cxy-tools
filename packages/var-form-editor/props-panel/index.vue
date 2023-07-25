<template>
    <div droppable @dragover="handlerContainerDragover" @drop="handleContainerDrop">
        <slot />
        <ul class="plugin-list">
            <template v-for="(plugin, index) in pluginsSchema">
                <!-- 一行里有多个 -->
                <li v-if="isSchemaArray(plugin)" :key="index" style="padding: 0;" droppable
                    @dragover.stop="handleItemDragover" @dragleave="handleItemDragLeave"
                    @drop.stop="handleItemDrop($event, index)">
                    <el-row v-if="plugin.length">
                        <template v-for="(childPlugin, childIndex) in plugin">
                            <el-col class="child-col" :key="childIndex" :span="Math.floor(24 / plugin.length)"
                                @click.native="handleEditProps(index, childIndex)">
                                {{ childPlugin.name }}
                                <i class="el-icon-delete" @click.stop="handleDelete(index, childIndex)"></i>
                            </el-col>
                        </template>
                    </el-row>
                    <!-- 空行 -->
                    <el-row v-else>
                        <el-col class="child-col">
                            空
                            <i class="el-icon-delete" @click.stop="handleDelete(index)"></i>
                        </el-col>
                    </el-row>
                </li>
                <li v-else :key="index" @click.stop="handleEditProps(index)" class="child-row">
                    {{ plugin.name }}
                    <i class="el-icon-delete" @click.stop="handleDelete(index)"></i>
                </li>
            </template>
        </ul>
        <props-editor ref="editor" :store="store" />
    </div>
</template>
<script>
import { mapStates } from '../store/helper';
import { plugins } from "../plugins.js"
import _ from 'lodash'
import propsEditor from './props-editor.vue'

export default {
    name: "props-panel",
    components: { propsEditor },
    props: {
        store: {
            required: true
        }
    },
    data() {
        return {};
    },
    computed: {
        ...mapStates({ pluginsSchema: 'pluginsSchema' }),
    },
    methods: {
        // 判断 schemaItem 是否数组
        isSchemaArray(schemaItem) {
            return Array.isArray(schemaItem);
        },
        // 经过外层盒子
        handlerContainerDragover(e) {
            // console.log('on dragover: ');
            e.preventDefault()
        },
        // 放在外层盒子
        handleContainerDrop(e) {
            const pluginId = e.dataTransfer.getData('plugin-id')
            // console.log('on drop: id = ', pluginId, typeof pluginId)
            const plugin = plugins.find(plugin => plugin.id === Number(pluginId))
            if (!plugin) {
                console.log('plugin not found， 组件配置出现错误');
                return
            }

            // 空行
            if (plugin.plugin === 'empty-line') {
                this.store.addPluginSchema([])
                return
            }

            this.store.addPluginSchema(_.cloneDeep(plugin))
        },
        // 经过 line 盒子
        handleItemDragover(e) {
            e.target.classList.add("item-dragover")
            e.preventDefault()
        },
        // 离开 line 盒子
        handleItemDragLeave(e) {
            e.target.classList.remove("item-dragover")
        },
        // 放在 line 盒子
        handleItemDrop(e, index) {
            const pluginId = e.dataTransfer.getData('plugin-id')
            const plugin = plugins.find(plugin => plugin.id === Number(pluginId))
            if (!plugin) {
                console.log('plugin not found， 组件配置出现错误');
                return
            }

            // console.log("on item drop: ", pluginId);
            e.target.classList.remove("item-dragover")
            // 空行
            if (plugin.plugin === 'empty-line') {
                this.$message.error('空行不能放在行内')
                return
            }
            this.store.addPluginSchemaToLine(plugin, index)
        },
        // 删除行
        handleDelete(rowIndex, colIndex) {
            this.store.deletePluginSchema(rowIndex, colIndex)
        },
        // 编辑属性
        handleEditProps(rowIndex, colIndex) {
            const pluginSchema = this.store.getPluginSchema(rowIndex, colIndex)
            // console.log('edit props: ', rowIndex, colIndex, pluginSchema);
            this.$refs.editor.show(pluginSchema, rowIndex, colIndex)
        }
    },
}
</script>

<style lang="scss" scoped>
.plugin-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
        border-bottom: 1px solid #ccc;
        padding: 5px 0;
        cursor: pointer;
    }

    .item-dragover {
        background: #ccc;
    }

    .child-col,
    .child-row {
        padding: 5px 0;
        position: relative;

        &:not(:last-child) {
            border-right: 1px solid #ccc;
        }

        &:hover {
            .el-icon-delete {

                display: block;
                position: absolute;
                right: 2px;
                top: 8px;
                color: red;
            }
        }
    }

    .child-row {
        border-right: none !important;
        ;
    }

    .el-icon-delete {
        display: none;
    }
}
</style>