<template>
    <el-form :model="storeFormData[schema.prop]" :rules="schema.valid_rules || {}" label-width="100px">
        <el-row v-for="(attrSchema, index) in schema.attributes" :key="index">
            <template v-if="isSchemaArray(attrSchema)">
                <el-col  v-for="(spiltSchema, index) in attrSchema" :key="index"
                    :span="Math.floor(24 / attrSchema.length)" :schema="spiltSchema" :store="store" >
                    <el-form-item :label="spiltSchema.label" :prop="spiltSchema.prop">
                        <common-item :schema="spiltSchema" :store="store" :row="storeFormData[schema.prop]" />
                    </el-form-item>
                </el-col>
            </template>
            <template v-else>
                <el-col>
                    <el-form-item :label="attrSchema.label" :prop="attrSchema.prop">
                        <common-item :schema="attrSchema" :store="store" :row="storeFormData[schema.prop]" />
                    </el-form-item>
                </el-col>
            </template>
        </el-row>
    </el-form>
</template>
<script>
import commonItem from '../common-item.vue';
import { mapStates } from '../store/helper';

export default {
    name: 'plugin-form',
    components: {
        commonItem
    },
    props: {
        store: {
            required: true
        },
        schema: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {}
    },
    computed: {
        ...mapStates({ storeFormData: 'formData' })
    },
    methods: {
        // 判断 schemaItem 是否数组
        isSchemaArray(schemaItem) {
            return Array.isArray(schemaItem);
        },
    },
}
</script>