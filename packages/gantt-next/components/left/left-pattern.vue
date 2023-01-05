<template>
    <div class="pattern-container">
        <div class="title-container" ref="titleContainer" v-if="showTitleGroup">
            <div class="titles" :style="{ height: titlesHeight + 'px' }" ref="titlesItems">
                <title-group v-for="(item, index) in titleGroups" :key="index" :title="item.title"
                    :height="item.length * dayBoxHeight" />
            </div>
        </div>
        <div class="item-containner" ref="container">
            <div class="items" ref="items">
                <title-item v-for="(data, index) in rows" :key="index" :title="data.name" :height="dayBoxHeight" />
            </div>
        </div>
    </div>
</template>
<script>
import titleItem from "./title-item.vue"
import titleGroup from "./title-group.vue"
import { mapStates } from '../../store/helper'

export default {
    name: "left-pattern",
    components: { titleItem, titleGroup },
    props: {
        store: {
            required: true
        }
    },
    computed: {
        ...mapStates({
            rows: 'rows',
            titleGroups: 'titleGroups',
            dayBoxHeight: 'dayBoxHeight',
            titlesHeight: state => state.dayBoxHeight * state.titleGroups.reduce((a, b) => {
                if (typeof a !== 'number') {
                    a = a.length
                }
                if (typeof b !== 'number') {
                    b = b.length
                }
                return a + b
            }),
            scrollY: 'scrollY',
            maxScrollHeight: 'maxScrollHeight',
            showTitleGroup: 'showTitleGroup'
        })
    },
    watch: {
        scrollY(newVal) {
            this.scrollTo(newVal, this.maxScrollHeight)
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
        user-select: none;
        flex: 40px 0 0;
        writing-mode: tb-rl;
        border: 1px solid #ccc;
        border-bottom: 0;
        border-top: 0;
        overflow: hidden;
        background: #ccc;

        .titles {
            width: 100%;
            background: white;
            text-align: left;
        }
    }

    .item-containner {
        flex: 1;
        overflow: hidden;
        background: #ccc;

        .items {
            background: white;
        }
    }
}
</style>
