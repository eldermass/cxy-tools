<template>
    <div class="pattern-container">
        <div class="title-container" ref="titleContainer">
            <div class="titles"  ref="titlesItems">
                <title-group :title="title" />
                <title-group :title="title" />
                <title-group :title="title" />
                <title-group :title="title" />
                <title-group :title="title" />
                <title-group :title="title" />
                <title-group :title="title" />
                <title-group :title="title" />
                <title-group :title="title" />
                <title-group :title="title" />
                <title-group :title="title" />
                <title-group :title="title" />
                <title-group :title="title" />
                <title-group :title="title" />
                <title-group :title="title" />
            </div>
        </div>
        <div class="item-containner" ref="container">
            <div class="items" ref="items">
                <title-item v-for="(data, index) in dataList" :key="index" :title="data.name" />
            </div>
        </div>
    </div>
</template>
<script>
import titleItem from "./title-item.vue"
import titleGroup from "./title-group.vue"

export default {
    name: "left-pattern",
    components: { titleItem, titleGroup },
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
            this.$refs.titleContainer && this.$refs.titleContainer.scrollTo(0, y)

            // 处理滚动的最后一个角
            if (!maxHeight) return
            const offset = maxHeight - y
            if (offset <= 7) {
                this.$refs.items.style.transform = `translateY(-${7 - offset}px)`
                this.$refs.titlesItems.style.transform = `translateY(-${7 - offset}px)`
            } else {
                this.$refs.items.style.transform = null
                this.$refs.titlesItems.style.transform = null
            }
        },
    },
}
</script>
<style lang="scss" scoped>
* {
    box-sizing: border-box;
}

.pattern-container {
    display: flex;
    // height: 400px;
    height: calc(100% - 60px);
    min-height: 400px;
    width: 200px;

    // overflow-y: hidden;
    .title-container {
        flex: 40px 0 0;
        writing-mode: tb-rl;
        border: 1px solid #ccc;
        border-bottom: 0px;
        overflow: hidden;

        .titles {
            height: 600px;
            width: 100%;
            background: white;
            text-align: left;
        }
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
