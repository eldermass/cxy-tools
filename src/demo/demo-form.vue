<template>
    <div>
        <div class="demo-form">
            <var-form ref="varForm" :form-data="formData" :schema="mockSchema" />
        </div>
        <el-button @click="getFormData">获取数据</el-button>
        <el-button @click="setFormData">设置数据</el-button>
        <el-button @click="updateFormData">更新数据</el-button>
        <el-button @click="getDataAndSchema">获取数据和结构</el-button>
    </div>
</template>

<script>
import { mockData, mockSchema } from '../../mocks/var-form'

export default {
    name: 'demo-form',
    data() {
        return {
            formData: mockData,
            mockSchema
        }
    },
    methods: {
        getFormData() {
            console.log(this.$refs.varForm.getFormData())
        },
        setFormData() {
            this.$refs.varForm.setFormData({
                name1: '李四',
                name2: '王五'
            })
        },
        updateFormData() {
            this.$refs.varForm.updateFormData('name1', '张三')
        },
        getDataAndSchema() {
            console.log(this.$refs.varForm.getDataAndSchema())
        }
    },
}

</script>
<style lang="scss" scoped>
.demo-form {
    border: 1px solid skyblue;
}
</style>
