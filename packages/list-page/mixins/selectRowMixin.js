/*
  1.在 table 中添加
     @current-change="handleCurrentRowChange"
     @selection-change="handleSelectionChange"
  2.在 table 中添加 选中框
     <el-table-column type="selection" />
  3.确定 tableRefName 的值
 */

  export default {
    data() {
      return {
        currentRow: undefined,
        multipleSelection: [],
        tableRefName: 'table'
      }
    },
    computed: {
      isSelected() {
        return this.multipleSelection.length > 0
      },
      isSingleSelected() {
        return this.multipleSelection.length === 1
      },
      isMultiSelected() {
        return this.multipleSelection.length > 1
      }
    },
    methods: {
      handleSelectionChange(selections) {
        // console.log('勾选行:', selections)
        this.multipleSelection = selections
      },
      handleCurrentRowChange(val) {
        // console.log('选择行：', val)
        this.currentRow = val
        // 已经选择过了
        if (this.multipleSelection.length > 1) return
  
        if (this.$refs[this.tableRefName]) {
          this.$refs[this.tableRefName].clearSelection()
          val && this.$refs[this.tableRefName].toggleRowSelection(val, true)
        } else {
          // 提示他们自己实现一个
          throw new Error('Cannot Find Ref Named table, You Need Implement Function handleCurrentRowChange Or Change the Value of tableRefName')
        }
      },
      clearCurrentSelectedRow() {
        // this.$refs[this.tableRefName].clearSelection()
        this.$refs[this.tableRefName] && this.$refs[this.tableRefName].setCurrentRow()
      }
    }
  }
  