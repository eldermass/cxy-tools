<template>
    <div class="preview-panel">
        <var-form ref="varForm" v-if="showForm" :form-data="formData" :schema="formSchema" :external-funcs="externalFuncs"
            :edit-mode="true" />
    </div>
</template>

<script>
import varForm from "../../var-form";
import { mapStates } from '../store/helper';

export default {
    name: "preview-panel",
    components: {
        varForm
    },
    props: {
        store: {
            required: true
        },
        // 外部函数队列
        externalFuncs: {
            type: Object,
            default: () => ({})
        },
    },
    data() {
        return {
            showForm: true
        };
    },
    computed: {
        ...mapStates({ formSchema: "formSchema", formData: "formData", pluginsSchema: "pluginsSchema" })
    },
    watch: {
        pluginsSchema: {
            handler() {
                this.store.generateFormSchema();
                this.showForm = false
                // 重新渲染预览页
                this.$nextTick(() => {
                    this.showForm = true
                    // this.$refs.varForm && this.$refs.varForm.setFormData(this.formData);
                })
            },
            deep: true
        }
    },
    mounted() {
        this.store.generateFormSchema();
        // 重新渲染预览页
        this.$nextTick(() => {
            this.$refs.varForm && this.$refs.varForm.setFormData(this.formData);
        })
    },
    methods: {
        getEditFormData() {
            return this.$refs.varForm.getFormData()
        },
        getValidateFormData() {
            return this.$refs.varForm.getValidateFormData()
        }
    },
}
</script>

<style lang="scss" scoped>
.preview-panel {
    height: 100%;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
}
</style>