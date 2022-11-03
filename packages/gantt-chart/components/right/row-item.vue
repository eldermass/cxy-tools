<template>
    <div
        @click.prevent="handleClick"
        :draggable="candrag"
        @dragstart="handleDragstart"
        @drop.prevent="handleDrop"
        @dragover.prevent="handleDragover"
        @dragleave="handleDragleave"
        class="row-item"
        v-if="days"
        :style="{ width: 30 * days + 'px', background: background }"
    >
        <div :class="['container', rowData.data.themeType ? rowData.data.themeType : 'default']" v-if="candrag">
            <div class="back"></div>
            <span class="title" :title="rowData.data.title">
                {{ rowData.data.title }}
            </span>
        </div>
    </div>
</template>
<script>
export default {
    name: "row-item",
    props: {
        rowData: {
            type: Object,
            default: () => ({}),
        },
        days: {
            type: Number,
            default: 1,
        },
        itemIndex: {
            type: Number,
            default: -1,
        },
        eventIndex: {
            type: Number,
            default: -1,
        },
    },
    data() {
        return {
            itemData: {},
            background: "none",
        }
    },
    computed: {
        candrag() {
            return !!Object.keys(this.rowData.data).length
        }
    },
    methods: {
        handleClick() {
            if (!this.rowData.data.id) return

            this.$emit("item-click", this.rowData.data)
        },
        handleDragstart(e) {
            // 不允许没有数据的格子拖拽
            if (!this.candrag || this.rowData.data.lock) {
                e.preventDefault()
                e.stopPropagation()
                return false
            }
            e.dataTransfer.setData("index", this.eventIndex + "-" + this.itemIndex)
        },
        handleDrop(e) {
            this.deactive()
            
            const arr = e.dataTransfer.getData("index").split("-")
            const dragRowIndex = parseInt(arr[0])
            const itemIndex = parseInt(arr[1])

            if (dragRowIndex !== this.eventIndex) {
                console.log("不能拖到其他行里去")
                return
            }
            if (this.rowData.data && this.rowData.data.lock) {
                console.log("被拖入单元被锁定")
                return
            }

            // console.log("drop ", e.dataTransfer.getData("index"), this.itemIndex)
            this.$emit("item-drop", itemIndex, this.itemIndex)
        },
        handleDragover() {
            this.active()
        },
        handleDragleave() {
            this.deactive()
        },
        active() {
            this.background = "#96c57f"
        },
        deactive() {
            this.background = "none"
        },
    },
}
</script>
<style lang="scss" scoped>
* {
    box-sizing: border-box;
}
.row-item {
    width: 30px;
    height: 100%;
    padding: 10px 1px 4px 1px;
    // border: 1px solid skyblue;
    display: inline-block;
    vertical-align: top;
    .container {
        height: 100%;
        border-radius: 4px;
        background: white;
        font-size: 13px;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        .back {
            width: 100%;
            height: 30%;
            bottom: 0;
            left: 0;
            position: absolute;
        }
        .title {
            margin-left: 7px;
        }
    }

    @each $type, $bordercolor, $backcolor in (default, #cb717b, #fbc3c4), ("green", #6bb42e, #d7eec0),
        ("purple", #7d78c8, #c5c5f9), ("blue", #afbfe4, #dfebf7), ("red", #eb3626, #f7635c),
        ("cyan", #3498ff, #a6d7ff), ("yellow", #ffb300, #ffe9c2), ("orange", #db8000, #fa9b2f)
    {
        .#{$type} {
            border: 1px solid $bordercolor;
            .back {
                background: $backcolor;
            }
        }
    }
}
</style>
