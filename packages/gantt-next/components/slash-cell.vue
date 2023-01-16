<template>
    <div>
        <div class="slash-cell" title="ctrl + shift + s 配置图表">
            <span class="top">{{ top }}</span>
            <span class="bottom">{{ bottom }}</span>
        </div>
    </div>
</template>
<script>
import { mapStates } from '../store/helper';

export default {
    name: "slash-cell",
    props: {
        top: {
            type: String,
            default: "日历",
        },
        store: {
            required: true
        },
        bottom: {
            type: String,
            default: "资源",
        },
    },
    computed: {
        ...mapStates({
            dayBoxWidth: 'dayBoxWidth'
        })
    }
}
</script>
<style lang="scss" scoped>
* {
    box-sizing: border-box;
}

.slash-cell {
    width: 100%;
    height: 60px;
    position: relative;
    border: 1px solid #ccc;
    position: relative;
    border-right: none;
    user-select: none;

    &:before {
        content: "";
        position: absolute;
        width: 1px;
        height: 208px;
        /*根据td的宽度和高度*/
        top: 0;
        left: 0;
        background-color: #ccc;
        display: block;
        transform: rotate(-73.8deg);
        /*根据线的位置*/
        transform-origin: top;
    }

    .top {
        position: absolute;
        right: 20px;
        top: 10px;
    }

    .bottom {
        position: absolute;
        left: 20px;
        bottom: 10px;
    }
}
</style>
