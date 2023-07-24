<template>
    <div>
        <slot />
        <ul class="plugin-list">
            <li v-for="plugin in plugins" :key="plugin.name" draggable @dragstart="handleDragStart($event, plugin.id)"
                @dragend="handleDragEnd">
                {{ plugin.name }}
            </li>
        </ul>
    </div>
</template>
<script>
import { plugins } from "../plugins.js"

export default {
    name: "plugins-panel",
    props: {
        store: {
            required: true
        }
    },
    data() {
        return {
            plugins
        };
    },
    methods: {
        handleDragStart(e, id) {
            e.dataTransfer.setData('plugin-id', id)
            // console.log('drag start: ', e);
        },
        handleDragEnd() {
            // console.log('drag end: ',  e);
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
        cursor: move;
    }
}
</style>