<template>
    <div>
        <div class="slash-cell">
            <span class="top">{{ top }} {{ rowKey }}</span>
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
            rowKey: 'rowKey',
            defaultExpandAll: 'defaultExpandAll'
        })
    },
    mounted() {
        setTimeout(() => {
            this.store.scheduleLayout()
            this.store.commit('setRowKey', 123)
        }, 1000)
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

    &:before {
        content: "";
        position: absolute;
        width: 2px;
        height: 208px;
        /*根据td的宽度和高度*/
        top: 0;
        left: 0;
        background-color: #ccc;
        display: block;
        transform: rotate(-74deg);
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
