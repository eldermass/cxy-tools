<template>
    <div>
        <slot />
        <ul class="plugin-list">
            <li v-for="plugin in plugins" :key="plugin.name" draggable @dragstart="handleDragStart($event, plugin.name)"
                @dragend="handleDragEnd">
                {{ plugin.name }}
            </li>
        </ul>
    </div>
</template>
<script>
import { plugins } from "./plugins.js"

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
        handleDragStart(e, name) {
            e.dataTransfer.setData('plugin-name', name)
            console.log('drag start: ', e);
        },
        handleDragEnd(e) {
            // e.preventDefault();
            const name = e.dataTransfer.getData('plugin-name')
            console.log('drag end: ', name,  e);
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