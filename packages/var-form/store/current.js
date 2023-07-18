export default {
    data() {
        return {
            states: {
                // 不可响应的，设置 currentRowKey 时，data 不一定存在，也许无法算出正确的 currentRow
                // 把该值缓存一下，当用户点击修改 currentRow 时，把该值重置为 null
                _currentRowKey: null,
                currentRow: null,
            },
        }
    },

    methods: {
        setCurrentRowKey(key) {
            this.assertRowKey()
            this.states._currentRowKey = key
            this.setCurrentRowByKey(key)
        },

        restoreCurrentRowKey() {
            this.states._currentRowKey = null
        },
    },
}
