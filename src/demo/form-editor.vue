<template>
    <div class="demo-form-editor">
        <var-form-editor ref="formEditor" :form-schema="mockFormSchema" />
        <el-button @click="getFormSchema">页面结构</el-button>
        <el-button @click="getTypeData">数据结构</el-button>
        <el-button @click="getFormData">默认数据</el-button>
    </div>
</template>

<script>
const mockFormSchema = []

export default {
    name: 'demo-form-edito',
    data() {
        return {
            mockFormSchema
        }
    },
    methods: {
        getFormData() {
            console.log(this.$refs.formEditor.getFormData())
        },
        getTypeData() {
            console.log(this.$refs.formEditor.getTypeData())
        },
        getFormSchema() {
            console.log(this.$refs.formEditor.getFormSchema())
        }
    },
}

</script>
<style lang="scss" scoped>
.demo-form-editor {
    height: 100%;
}
</style>
