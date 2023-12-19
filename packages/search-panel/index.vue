<template>
  <div class="search-panel">
    <el-form :inline="true">
      <div class="search-item-container" v-for="(layout, index) in layoutList" :key="index" :span="6">
        <el-form-item style="margin: 0;">
          <!--     标题框      -->
          <template #label>
            <el-select v-model="searchList[index].prop" size="mini" style="width: 100px" placeholder="请选择" clearable>
              <el-option v-for="item in queryOptions" :key="item.prop" :label="item.label" :value="item.prop" />
            </el-select>
          </template>

          <!-- 时间选择器 -->
          <el-date-picker v-if="layout.type === 'datetime'" v-model="searchList[index].value" style="width: 130px;"
            size="mini" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"
            :placeholder="layout.placeholder" />

          <!-- 树形结构 -->
          <select-tree v-else-if="layout.type === 'tree'" v-model="searchList[index].value" :props="layout.props"
            :options="layout.options" :filterable="layout.filterable" :muliple="layout.muliple"
            :leafOnly="layout.leafonly" :placeholder="layout.placeholder" style="width: 120px;" />

          <!-- 多选框 -->
          <el-select v-else-if="layout.type === 'select' && layout.options" :multiple="layout.multiple"
            v-model="searchList[index].value" size="mini" style="width: 120px" placeholder="请选择" clearable>
            <el-option v-for="item in layout.options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>

          <!-- 插槽 -->
          <div v-else-if="layout.type === 'slot'">
            <slot :name="layout.slotName" :searchList="searchList" :setQuerys="setQuerys" />
          </div>

          <!-- 输入框 -->
          <el-input v-else v-model="searchList[index].value" :placeholder="layout.placeholder" style="width: 120px"
            size="mini" clearable @keyup.enter.native="handleQuery" />
        </el-form-item>
      </div>
      <el-form-item>
        <col-button class="act-button" type="warning" icon="plus" @click.prevent="addQuery" />
        <col-button class="act-button" type="danger" icon="delete" @click.prevent="substractQuery" />
        <col-button class="act-button" title="搜索" type="primary" icon="search" @click.prevent="handleQuery" />
        <col-button class="act-button" title="重置" icon="refresh" @click.prevent="handleReset" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import colButton from '../buttons/index.vue'
import SelectTree from '../select-tree/index.vue'
import _ from 'lodash'

export default {
  name: 'search-panel',
  components: { colButton, SelectTree },
  props: {
    // 最大可选数限制
    limit: {
      type: Number,
      default: 3
    },
    paramList: {
      type: Array,
      default: () => []
    },
    defaultQuerys: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      queryOptions: [], // 可选的查询条件
      searchList: [{}] // 查询条件 [{ prop: '', value: '' } ...]
    }
  },
  computed: {
    layoutList() {
      const list = this.searchList.map(item => {
        return this.paramList.find(option => option.prop === item.prop) || {}
      }).filter(item => item)
      return _.cloneDeep(list)
    },
  },
  mounted() {
    // console.log('plan: 扩充该组件支持的类型');
    this.initQuery()
  },
  methods: {
    initQuery() {
      this.queryOptions = _.cloneDeep(this.paramList)

      // 赋予查询项默认空值
      this.searchList = this.defaultQuerys.map(prop => ({
        prop: prop,
        value: undefined
      }))
    },
    handleQuery() {
      const querys = this.getQuerys()
      this.$emit('query', querys)
    },
    handleReset() {
      this.initQuery()
      this.handleQuery()
    },
    addQuery() {
      this.searchList.push({})
    },
    substractQuery() {
      this.searchList.pop()
    },
    // 获取查询条件
    getQuerys() {
      const querys = {}
      // 过滤空值
      this.searchList.map(item => {
        if (item.prop && ![undefined, null, ''].includes(item.value)) {
          querys[item.prop] = item.value
        }
      })
      return querys
    },
    // 设置查询条件
    setQuerys(prop, value) {
      const find = this.searchList.find(item => item.prop === prop)
      if (find) {
        find.value = value
      }
    }
  }
}
</script>
  
<style lang="scss" scoped>
.search-item-container {
  margin-right: 15px;
  display: inline-block;
  vertical-align: top;

  .el-form-item {
    margin-bottom: 0;
  }
}

.act-button {
  transform: scale(0.95)
}

.el-form-item {
  margin: 0;
}

::v-deep(.el-form-item__label) {
  padding-right: 1px;
}

::v-deep(.vue-treeselect__control) {
  transform: scaleY(0.77);
}
</style>
  