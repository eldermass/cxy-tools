<template>
    <el-button v-bind="$attrs" :icon="iconString" :size="size" :loading="loadingStatus" @click.stop="handleClick">
        <template v-if="title">
            {{ title }}
        </template>
        <slot v-else />
    </el-button>
</template>
  
<script>
export default {
    name: 'cxy-button',
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
        size: {
            type: String,
            default: 'mini'
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
                this.$emit('click', () => {
                    this.loadingStatus = false
                }, e)
            } else {
                this.$emit('click', e)
            }
        }
    }
}
</script>
  
<style scoped></style>
  