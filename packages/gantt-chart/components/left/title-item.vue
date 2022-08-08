<template>
    <div class="title-item" :title="title">
        {{ title }}
    </div>
</template>
<script>
export default {
    name: "title-item",
    props: {
        title: {
            type: String,
            default: "阿法狗豆腐干豆腐干豆腐干豆腐干岁的法国",
        },
    },
}
</script>
<style lang="scss" scoped>
.title-item {
    width: 160px;
    height: 40px;
    line-height: 40px;
    padding: 0 0 0 20px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
