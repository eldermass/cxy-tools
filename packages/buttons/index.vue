<template>
    <el-button v-bind="$attrs" :icon="iconString" size="mini" :loading="loadingStatus"
        @click="handleClick">
        <template v-if="title">
            {{ title }}
        </template>
        <slot v-else />
    </el-button>
</template>
  
<script>
export default {
    name: 'ColButton',
    props: {
        title: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        },
        autoLoading: {
            type: Boolean,
            default: false
        },
        permissions: {
            type: Array,
            default: () => []
        },
        offset: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            loadingStatus: false
        }
    },
    computed: {
        iconString() {
            return this.icon ? `el-icon-${this.icon}` : ''
        }
    },
    methods: {
        handleClick(e) {
            if (this.autoLoading) {
                this.loadingStatus = true
            }
            this.$emit('click', () => {
                this.loadingStatus = false
            }, e)
        }
    }
}
</script>
  
<style scoped></style>
  