<template>
    <col-button title="新增" type="primary" icon="plus" @click="handleAdd" />
</template>
  
<script>
import colButton from '../../buttons/index.vue'

export default {
    name: 'ColButton',
    components: {
        colButton
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
  