<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div :class="['custom-item', errorClass]" @input="handleInput" @dblclick="handleDbClick">
        <!-- input 框 -->
        <template v-if="schema.type === 'input'">
            <el-input v-model="row[schema.prop]" :disabled="schema.disabled" :placeholder="schema.placeholder">
                <i v-if="schema.modalSearch" slot="suffix" class="el-input__icon el-icon-search" style="cursor: pointer;"
                    @click="handleModalSearch"></i>
            </el-input>
        </template>
        <!-- textarea 框 -->
        <template v-else-if="schema.type === 'input-textarea'">
            <el-input type="textarea" v-model="row[schema.prop]" :rows="schema.rows || 3" :disabled="schema.disabled"
                :placeholder="schema.placeholder" />
        </template>
        <!-- input 数字 -->
        <template v-else-if="schema.type === 'input-number'">
            <el-input-number v-model="row[schema.prop]" clearable :disabled="schema.disabled"
                :placeholder="schema.placeholder" />
        </template>
        <!-- select 下拉框 -->
        <template v-else-if="schema.type === 'select'">
            <el-select v-model="row[schema.prop]" :multiple="schema.multiple" :disabled="schema.disabled"
                :placeholder="schema.placeholder">
                <el-option v-for="item in schema.options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </template>
        <!-- 时间选择器 date-picker -->
        <template v-else-if="schema.type === 'date-picker'">
            <el-date-picker v-model="row[schema.prop]" :type="schema.dateType || 'date'" :disabled="schema.disabled"
                value-format="yyyy-MM-dd HH:mm:ss" :placeholder="schema.placeholder" placement="bottom-start" />
        </template>
        <!-- 时间日期 time-picker -->
        <template v-else-if="schema.type === 'time-picker'">
            <el-time-picker v-model="row[schema.prop]" :disabled="schema.disabled" value-format="HH:mm:ss"
                :placeholder="schema.placeholder" placement="bottom-start" />
        </template>
        <!-- 开关 switch -->
        <template v-else-if="schema.type === 'switch'">
            <el-switch v-model="row[schema.prop]" :disabled="schema.disabled" active-color="#13ce66" />
        </template>
        <!-- 单选框 radio -->
        <template v-else-if="schema.type === 'radio'">
            <el-radio-group v-model="row[schema.prop]" :disabled="schema.disabled">
                <el-radio v-for="item in schema.options" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
            </el-radio-group>
        </template>
        <!-- 多选框 checkbox -->
        <template v-else-if="schema.type === 'checkbox'">
            <el-checkbox-group v-model="row[schema.prop]" :disabled="schema.disabled">
                <el-checkbox v-for="item in schema.options" :key="item.value" :label="item.value">{{ item.label
                }}</el-checkbox>
            </el-checkbox-group>
        </template>
        <!-- html -->
        <template v-else-if="schema.type === 'html'">
            <!-- editMode -->
            <el-input v-if="editMode" v-model="row[schema.prop]" placeholder="HTML 当前处于编辑模式，该值将挂到属性上" />
            <div v-else v-html="row[schema.prop] || schema.fixedValue" />
        </template>

        <!-- 显示文本 -->
        <template v-else-if="schema.type === 'text'">
            <el-input v-if="editMode" v-model="row[schema.prop]" placeholder="Text 当前处于编辑模式，该值将挂到属性上" />
            <span v-else>{{ row[schema.prop] }}</span>
        </template>

        <template v-else>
            <div>
                没有定义 type：{{ schema.type }}
            </div>
        </template>
    </div>
</template>

<script>
import { mapStates } from './store/helper'

export default {
    name: 'common-item',
    props: {
        store: {
            required: true
        },
        schema: {
            type: Object,
            default: () => ({})
        },
        row: {
            type: Object,
            default: () => ({})
        },
        group: {
            type: String
        },
        rowIndex: {
            type: Number
        }
    },
    data() {
        return {
            errorClass: ''
        }
    },
    computed: {
        ...mapStates({ editMode: 'editMode' })
    },
    created() {
        this.initFormData()
        this.initOptionsData()
    },
    methods: {
        initFormData() {
            // 当有些需要绑定数组类型的数据，但是form中又没有定义的时候，需要初始化一下
            const shouldInits = ['checkbox']
            if (shouldInits.includes(this.schema.type) && !this.row[this.schema.prop]) {
                // 非直接表单结构，更新 row 数据
                if (this.schema.plugin !== 'form-item') {
                    this.$set(this.row, this.schema.prop, [])
                    return
                }
                // 直接表单结构更新 formData 数据
                this.store.updateFormData(this.schema.prop, [])
            }
        },
        // 初始化选择数据
        initOptionsData() {
            // http://10.10.2.201:8881/api/modalinfo/1/
            // 不属于选项类型的，直接返回
            const shouldReq = ['select', 'radio', 'checkbox']
            if (!shouldReq.includes(this.schema.type)) return
            if (this.schema.options) return

            // 有配置源时请求
            if (this.schema.optionSource) {
                // 从缓存中获取，避免重复请求
                const optionReq = this.store.getStoreOptionsa(this.schema.optionSource)
                optionReq.then(res => {
                    // console.log(res)
                    this.$set(this.schema, 'options', res.data)
                    this.$forceUpdate()
                })
            }

        },
        // 自动计算值
        initAutoComputed() {
            if (this.schema.autocomputed) {
                const key = `${this.group}_${this.rowIndex}_${this.schema.prop}`
                // console.log("自动计算", key)
                try {
                    const func = eval(`(${this.schema.autocomputed})`)

                    const buildInFunc = {
                        add: this.buildInAdd,
                        min: this.buindInMin
                    }

                    const funcWithData = func.bind(this, this.row, buildInFunc)
                    funcWithData.key = key
                    this.store.addAutoComputedFunc(funcWithData)
                } catch (error) {
                    console.warn(this.schema.type, "自动计算函数错误", error)
                    console.error(error)
                }
            }
        },
        buildInAdd(a, b, c = this.schema.prop) {
            this.$set(this.row, c, Number(this.row[a]) + Number(this.row[b]))
        },
        buindInMin(a, b, c = this.schema.prop) {
            this.$set(this.row, c, Number(this.row[a]) - Number(this.row[b]))
        },
        handleInput(event) {
            // 分发全部自动填充
            this.store.invokeAutoComputedFuncs()

            // name 需要检验时，就会传入 valid_name 的字段，没有的话就不需要验证
            if (!Object.keys(this.row).includes("valid_" + this.schema.prop))
                // Object.keys直接用传入数据，能优化性能
                return

            // console.log(`需要验证${this.schema.prop}字段`)
            const valid_func = this.row["valid_" + this.schema.prop]
            if (valid_func && typeof valid_func === 'string') {
                try {
                    const callback = eval(`(${valid_func})`)
                    // 当前属性，当前值，当前行数据
                    const result = callback(this.schema.prop, event.target.value, this.row)
                    console.log("valid_ 验证结果：", result)
                    if (result) {
                        this.errorClass = ''
                    } else {
                        this.errorClass = 'customer-error'
                    }
                } catch (error) {
                    console.error(`验证函数解析失败，请检查 ${this.schema.prop} 的验证函数！`)
                    console.error(error)
                }
            }
        },
        // 双击事件
        handleDbClick() {
            if (!this.schema.onDblClick) return
            try {
                const callback = eval(`(${this.schema.onDblClick})`)
                // 当前属性，当前值，外部函数
                callback.call(this, this.row, this.store.getExternalFuncs())

            } catch (error) {
                console.error(`双击事件解析失败，请检查 ${this.schema.prop} 的双击事件！`)
                console.error(error)
            }
        },
        // input 弹窗搜索
        handleModalSearch(){
            if (!this.schema.modalSearch) return
            try {
                const callback = eval(`(${this.schema.modalSearch})`)
                // 当前属性，当前值，外部函数
                callback.call(this, this.row, this.store.getExternalFuncs())

            } catch (error) {
                console.error(`弹窗搜索解析失败，请检查 ${this.schema.prop} 的弹窗搜索！`)
                console.error(error)
            }
        }
    },
    mounted() {
        this.initAutoComputed()
    },
    watch: {
        schema: {
            handler() {
                this.initAutoComputed()
            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.customer-error :deep(.el-input__inner) {
    border: 1px solid red !important;

    &::focus {
        border-color: red !important;
    }
}
</style>