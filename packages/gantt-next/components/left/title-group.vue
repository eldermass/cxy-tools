<template>
    <div class="title" :style="{ height: height + 'px' }" :title="title">
        {{  title  }}
    </div>
</template>
<script>
export default {
    name: "title-item",
    props: {
        title: {
            type: String,
            default: "这是一组title的父级",
        },
        height: {
            type: Number,
            default: 40
        }
    },
}
</script>
<style lang="scss" scoped>
.title {
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    width: 100%;
    padding: 5px 0;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
}
</style>
