<template>
    <col-button title="删除" type="danger" :size="size" :disabled="!isSelected" icon="delete" @click="handleDelete" />
</template>
  
<script>
import colButton from '../../buttons/index.vue'
import { request } from '../helper'

export default {
    name: 'ColButton',
    components: {
        colButton
    },
    props: {
        button: {
            type: Object,
            default: () => ({})
        },
        refresh: {
            type: Function,
            default: () => { }
        },
        multipleSelection: {
            type: Array,
            default: () => []
        },
        size: {
            type: String,
            default: 'mini'
        }
    },
    data() {
        return {}
    },
    computed: {
        isSelected() {
            return this.multipleSelection.length > 0
        },
        isSingleSelected() {
            return this.multipleSelection.length === 1
        },
        isMultiSelected() {
            return this.multipleSelection.length > 1
        }
    },
    methods: {
        async handleDelete() {
            if (!this.button.requestUrl) {
                return this.$message.error('请配置请求地址')
            }

            const ids = this.multipleSelection.map(item => item.id)

            const confirm = await this.$confirm(`是否删除选中项？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(() => { })

            if (!confirm) return

            const res = await request.post(this.button.requestUrl, { ids }).catch(() => {
                this.$message.error('网络异常，请稍后重试')
            })
            console.log(res.message, 'sssss');

            if (res && res.code === 200) {
                this.$message.success(res.message || '删除成功')
                this.refresh()
            } else {
                this.$message.error(res.message || '删除失败')
            }
        }
    }
}
</script>
  
<style scoped></style>
  