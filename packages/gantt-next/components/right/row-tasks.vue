<template>
    <div class="row-tasks">
        <row-tasks-item v-for="(task, index) in tasks" :key="index" :store="store" :task="task" />
    </div>
</template>
<script>
import rowTasksItem from "./row-tasks-item.vue"
import { mapStates } from "../../store/helper"

export default {
    name: "row-tasks",
    components: { rowTasksItem },
    props: {
        store: {
            required: true
        }
    },
    data() {
        return {
            tasksList: [
                // {
                //     task_id: 1,
                //     text: 'this is test one',
                //     row_index: 0,
                //     start_date: '2023-01-05 12:00:00',
                //     duration: 1.5,
                //     theme: 'default',
                //     is_lock: false,
                //     data: {},
                // }
            ]
        }
    },
    computed: {
        ...mapStates({
            tasks: 'tasks'
        }),
    },
    mounted() {
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}

.row-tasks {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
</style>
