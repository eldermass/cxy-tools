<template>
    <div class="title" :title="title">
        {{  title  }}
    </div>
</template>
<script>
export default {
    name: "title-item",
    props: {
        title: {
            type: String,
            default: "阿法狗豆腐干豆腐干",
        },
    },
}
</script>
<style lang="scss" scoped>
.title {
    line-height: 40px;
    display: inline-block;
    height: 40px;
    width: 100%;
    padding: 5px 0;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
