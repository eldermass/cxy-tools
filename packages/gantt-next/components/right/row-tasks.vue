<template>
    <div class="row-tasks">
        <row-tasks-item :store="store" />
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
            dates: [
                // {
                //     year: 2022,
                //     month: 8,
                //     date: 2,
                //     day: 2,
                //     is_last_date: false,
                //     is_last_month: false,
                //     date_string: "2022-8-2",
                // },
            ],
        }
    },
    computed: {
        ...mapStates({
            totalLengthStyle: (state) => ({
                width: state.daysList.length * state.dayBoxWidth + 'px',
                height: state.rows.length * state.dayBoxHeight + 'px'
            }),
            daysList: 'daysList',
            dayBoxWidth: "dayBoxWidth",
            rows: 'rows',
            dayBoxHeight: 'dayBoxHeight'
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
