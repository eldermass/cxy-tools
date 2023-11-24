<template>
    <col-button title="修改" type="warning" :disabled="!isSingleSelected" icon="edit" @click="handleUpdate" />
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
        handleUpdate() {
            console.log('handleUpdate')
        }
    }
}
</script>
  
<style scoped></style>
  