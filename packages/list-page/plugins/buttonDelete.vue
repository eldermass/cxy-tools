<template>
    <col-button title="删除" type="danger" :disabled="!isSelected" icon="delete" @click="handleDelete" />
</template>
  
<script>
import colButton from '../../buttons/index.vue'

export default {
    name: 'ColButton',
    components: {
        colButton
    },
    props: {
        multipleSelection: {
            type: Array,
            default: () => []
        },
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
        handleDelete() {
            console.log('handleDelete')
        }
    }
}
</script>
  
<style scoped></style>
  