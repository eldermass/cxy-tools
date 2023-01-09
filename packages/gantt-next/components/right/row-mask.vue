<template>
    <div class="back-mask">
        <div class="row-mask-line" v-for="(row, i) in rows" :key="i" :style="{ height: dayBoxHeight + 'px' }">
            <row-mask-item class="row-mask-item" v-for="(date, index) in daysList" :key="index"
                :box-lenght="dayBoxWidth" :date="date" />
        </div>
    </div>
</template>
<script>
import rowMaskItem from "./row-mask-item.vue"
import { mapStates } from "../../store/helper"

export default {
    name: "row-mask",
    components: { rowMaskItem },
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

.back-mask {
    width: 100%;
    height: 100%;
    font-size: 0;
    position: relative;

    .row-mask-line {
        &:first-of-type {
            .row-mask-item {
                border-top: none;
            }
        }
    }
}
</style>
