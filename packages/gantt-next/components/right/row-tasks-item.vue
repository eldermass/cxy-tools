<template>
    <div class="row-tasks-item" 
        :style="{
            width: '50px',
            height: '40px',
            lineHeight: '40px'
        }">
        test
    </div>
</template>
<script>
export default {
    name: "row-tasks-item",
    props: {
        store: {
            required: true
        },
        task: {
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

.row-tasks-item {
    position: absolute;
    left: 0;
    top: 0;
    border: 1px solid red;
    text-align: center;

    &:nth-of-type(1) {
        border-left: none;
    }
}

.gray-background {
    background: #e0e2ee;
}
</style>
