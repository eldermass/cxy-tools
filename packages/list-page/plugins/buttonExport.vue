<template>
    <export-button />
</template>
  
<script>
import exportButton from '../../buttons/export-button.vue'

export default {
    name: 'ColButton',
    components: {
        exportButton
    },
    props: {

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
  