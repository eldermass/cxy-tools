<template>
    <div class="left-container-p">
        <slash-cell />
        <div class="pattern-container">
            <div class="title">{{ title }}</div>
            <div class="item-containner" ref="container">
                <div class="items" ref="items">
                    <title-item v-for="(data, index) in dataList" :key="index" :title="data.name" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import slashCell from "./slash-cell.vue"
import titleItem from "./title-item.vue"

export default {
    name: "left-pattern",
    components: { slashCell, titleItem },
    props: {
        dataList: {
            type: Array,
            default: () => [],
        },
        title: {
            type: String,
            default: "2 号楼 1 楼SMT车间"
        }
    },
    methods: {
        scrollTo(y, maxHeight) {
            this.$refs.container && this.$refs.container.scrollTo(0, y)

            // 处理滚动的最后一个角
            if (!maxHeight) return
            const offset = maxHeight - y
            if (offset <= 7) {
                this.$refs.items.style.transform = `translateY(-${7 - offset}px)`
            } else {
                this.$refs.items.style.transform = null
            }
        },
    },
}
</script>
<style lang="scss" scoped>
* {
    box-sizing: border-box;
}
.left-container-p {
    height: 100%;
}

.pattern-container {
    display: flex;
    // height: 400px;
    height: calc(100% - 60px);
    min-height: 400px;
    // overflow-y: hidden;
    .title {
        flex: 40px 0 0;
        padding: 0 7px;
        writing-mode: tb-rl;
        border: 1px solid #ccc;
    }
    .item-containner {
        flex: 1;
        overflow: hidden;
        .items {
            background: white;
        }
    }
}
</style>
