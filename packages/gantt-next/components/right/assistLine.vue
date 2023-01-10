<template>
    <div class="assist-line" v-if="assistLine && assistLineActive">
        <div class="line-inner" :style="{ left: offsetLeft + 'px' }">
            <div class="tips">
                {{ assistTipTime.substring(5) }}
            </div>
        </div>
    </div>
</template>
<script>
import { mapStates } from "../../store/helper"
const dayjs = require('dayjs')

export default {
    name: "assist-line",
    components: {},
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
        offsetLeft() {
            if (!this.assistTipTime) return -1

            const diffTime = dayjs(this.assistTipTime).diff(this.nowTime)
            const diffDays = (diffTime / 86400000).toFixed(2)

            return diffDays * this.dayBoxWidth
        },
        ...mapStates({
            nowTime: 'nowTime',
            dayBoxWidth: 'dayBoxWidth',
            assistLine: 'assistLine',
            assistLineActive: 'assistLineActive',
            assistTipTime: 'assistTipTime'
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

.assist-line {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    .line-inner {
        position: absolute;
        top: 0;
        left: 50px;
        height: 100%;
        width: 0;
        border-left: 1px dashed red;
    }

    .tips {
        position: absolute;
        left: 0;
        top: 0;
        width: 150px;
        text-align: left;
        padding-left: 5px;
    }
}
</style>
