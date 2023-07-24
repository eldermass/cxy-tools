<template>
    <div class="preview-panel">
        <var-form ref="varForm" :form-data="formData" :schema="formSchema" />
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
        }
    },
    data() {
        return {};
    },
    computed: {
        ...mapStates({ formSchema: "formSchema", formData: "formData", pluginsSchema: "pluginsSchema" })
    },
    watch: {
        pluginsSchema: {
            handler() {
                this.store.generateFormSchema();
                // 重新渲染预览页
                this.$nextTick(() => {
                    this.$refs.varForm?.setFormData(this.formData);
                })
            },
            deep: true
        }
    },
    mounted() {
        this.store.generateFormSchema();
        // 重新渲染预览页
        this.$nextTick(() => {
            this.$refs.varForm?.setFormData(this.formData);
        })
    },
    methods: {},
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