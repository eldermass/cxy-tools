<template>
    <div :class="['row-item-back', { 'gray-background': date.day === 0 || date.day === 6 }]">
        <!-- {{ date.date }} -->
    </div>
</template>
<script>
export default {
    name: "row-item-back",
    props: {
        date: {
            type: Object,
            default: () => ({}),
        },
    },
}
</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}

.row-item-back {
    display: inline-block;
    height: 100%;
    width: 30px;
    border: 1px solid #ccc;
    line-height: 40px;
    text-align: center;
    &:nth-of-type(1) {
        border-left: none;
    }
}
.gray-background {
    background: #e0e2ee;
}
</style>
