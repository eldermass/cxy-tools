import Vue from "vue"
import _ from "lodash"
// import current from './current'

export default Vue.extend({
    data() {
        return {
            states: {
                formData: {},
                formSchema: [],
                externalFuncs: {},
                storeOptions: [], // url, req
                editMode: false,
                autoComputedFuncs: []
            },
        }
    },

    // mixins: [current],

    methods: {
        // 获取外部函数
        getExternalFuncs() {
            return this.states.externalFuncs
        },
        // 获取数据
        getFormData() {
            return _.cloneDeep(this.states.formData)
        },
        setFormData(formData) {
            this.states.formData = _.cloneDeep(formData)
        },
        updateFormData(key, value) {
            this.$set(this.states.formData, key, value)
            // this.states.formData[key] = value
        },
        // 设置并获取 storeOptions
        getStoreOptionsa(url) {
            const storedOption = this.states.storeOptions.find(item => item.url === url)
            let newOption

            if (!storedOption) {
                newOption = {
                    url,
                    req: fetch(url).then(res => res.json())
                }
                this.states.storeOptions.push(newOption)
            }
            return storedOption ? storedOption.req : newOption.req
        },
        addAutoComputedFunc(func) {
            const findIndex = this.states.autoComputedFuncs.findIndex(item => item.key === func.key)
            // console.log(findIndex, func.key)
            if (findIndex > -1) {
                this.states.autoComputedFuncs.splice(findIndex, 1, func)
            } else {
                this.states.autoComputedFuncs.push(func)
            }
        },
        invokeAutoComputedFuncs() {
            // console.log(this.states.autoComputedFuncs)
            this.states.autoComputedFuncs.forEach(func => func())
        }
    },
})
