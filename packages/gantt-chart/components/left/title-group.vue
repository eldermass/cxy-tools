<template>
    <div class="title" :style="{ height: length * 40 + 'px' }" :title="title">
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
        length: {
            type: Number,
            default: 1
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
