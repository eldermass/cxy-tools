<template>
    <div class="assist-line" v-if="assistLine && assistLineActive">
        <div class="line-inner" :style="{ left: assistLineOffset + 'px' }">
            <div class="tips">
                {{ tipString }}
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
        tipString() {
            const hours = this.assistLineOffset / this.dayBoxWidth * 24
            const date_string = dayjs(this.nowTime).add(hours, 'hour').format('MM-DD HH:mm:ss')
            return date_string
        },
        ...mapStates({
            nowTime: 'nowTime',
            dayBoxWidth: 'dayBoxWidth',
            assistLine: 'assistLine',
            assistLineOffset: 'assistLineOffset',
            assistLineActive: 'assistLineActive'
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
    }
}
</style>
