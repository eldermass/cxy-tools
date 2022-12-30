import Vue from 'vue'
// import current from './current'

export default Vue.extend({
  data() {
    return {
      states: {
        rowKey: null,
        // 渲染的数据来源，是对 table 中的 data 过滤排序后的结果
        data: [],
      }
    };
  },

  // mixins: [current],

  methods: {
    // 检查 rowKey 是否存在
    assertRowKey() {
      const rowKey = this.states.rowKey;
      if (!rowKey) throw new Error('[ElTable] prop row-key is required');
    },
    // 重新渲染 左侧表头
    updateColumns() {

    },
    // 重新渲染列表内容
    scheduleLayout() {
      console.log('scheduleLayout')
    },
    // 选择
    isSelected(row) {
      const { selection = [] } = this.states;
      return selection.indexOf(row) > -1;
    },

    clearSelection() {
      const states = this.states;
      states.isAllSelected = false;
      const oldSelection = states.selection;
      if (oldSelection.length) {
        states.selection = [];
        this.table.$emit('selection-change', []);
      }
    }
  }
});
