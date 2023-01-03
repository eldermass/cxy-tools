import Vue from 'vue'
import mockList, { titleGroups } from '../../../mocks/gantt-chart'
// import current from './current'

export default Vue.extend({
  data() {
    return {
      states: {
        // 每个格子的宽度
        dayBoxWidth: 30,
        dayBoxHeight: 40,
        // 渲染的数据来源
        rows: mockList,
        // 展示的每个栏目
        tasks: [],
        // 箭头
        links: [],
        // 要展示的日历周期，用于绘制底图
        daysList: [],
        // 左侧分组
        titleGroups: titleGroups,
        // 是否展示左侧分组
        showTitleGroup: true,
        // 内容的y轴滚动距离
        scrollY: 0,
        // y 轴最大滚动
        maxScrollHeight: 0
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
