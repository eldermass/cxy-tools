<template>
    <div class="title-item" :title="title" :style="{ height: height + 'px', lineHeight: height + 'px' }">
        {{ title }}
    </div>
</template>
<script>
export default {
    name: "title-item",
    props: {
        title: {
            type: String,
            default: "这是一行测试的标题，有点长",
        },
        height: {
            type: Number,
            default: 40
        }
    },
}
</script>
<style lang="scss" scoped>
.title-item {
    // width: 160px;
    height: 40px;
    line-height: 40px;
    padding: 0 0 0 20px;
    border: 1px solid #ccc;
    border-right: 0px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
