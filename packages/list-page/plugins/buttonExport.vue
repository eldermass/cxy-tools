<template>
    <export-button :size="size" />
</template>
  
<script>
import exportButton from '../../buttons/export-button.vue'

export default {
    name: 'ColButton',
    components: {
        exportButton
    },
    props: {
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
        handleAdd() {
            console.log('handleAdd')
        }
    }
}
</script>
  
<style scoped></style>
  