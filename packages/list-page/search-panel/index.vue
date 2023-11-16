<template>
    <div class="search-panel">
      <el-form ref="queryForm" :inline="true">
        <el-row>
          <el-col v-for="(layout, index) in layoutList" :key="index" :span="6">
            <el-form-item style="margin: 0;">
              <!--     标题框      -->
              <el-select v-model="searchList[index].prop" size="mini" style="width: 100px" placeholder="请选择" clearable>
                <el-option
                  v-for="item in queryOptions"
                  :key="item.prop"
                  :label="item.label"
                  :value="item.prop"
                />
              </el-select>
              <!--     取值框      -->
              <workcenter-tree
                v-if="layout.type === 'workCenter'"
                v-model="searchList[index].value"
                :multiple="false"
                :always-open="false"
                :limit="1"
                :max-height="200"
                style="width: 150px; height: 24px; display: inline-block;"
              />
  
              <el-date-picker
                v-else-if="layout.type === 'datetime'"
                v-model="searchList[index].value"
                style="width: 130px;"
                size="mini"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                :placeholder="layout.placeholder"
              />
              <el-select
                v-else-if="layout.type === 'select' && layout.options"
                v-model="searchList[index].value"
                size="mini"
                style="width: 120px"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in layout.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-input
                v-else
                v-model="searchList[index].value"
                :placeholder="layout.placeholder"
                style="width: 120px"
                size="mini"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </el-col>
          <el-form-item>
            <col-button type="warning" icon="plus" style="transform: scale(0.95)" @click="addQuery" />
            <col-button type="danger" icon="delete" style="transform: scale(0.95)" @click="substractQuery" />
            <col-button title="搜索" type="primary" style="transform: scale(0.95)" icon="search" @click="handleQuery" />
            <col-button title="重置" icon="refresh" style="transform: scale(0.95)" @click="handleReset" />
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </template>
  <script>
  import colButton from '../../buttons/index.vue'
  // paramList
  // {
  //   prop: 'planStartDt',
  //   label: '计划开始时间',
  //   type: 'datetime' | 'workCenter' | 'input' | 'select',
  //   options: [],  // 当type为select时，必填
  //   placeholder: '计划开始时间'
  // }
  export default {
    name: 'SearchPanel',
    components: { colButton },
    props: {
      // 最大可选数限制
      limit: {
        type: Number,
        default: 3
      },
      paramList: {
        type: Array,
        required: true
      },
      defaultQuerys: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        queryOptions: [],
        searchList: [{}]
      }
    },
    computed: {
      layoutList() {
        const list = this.searchList.map(item => {
          return this.paramList.find(option => option.prop === item.prop) || {}
        }).filter(item => item)
        return JSON.parse(JSON.stringify(list))
      }
    },
    mounted() {
      this.queryOptions = JSON.parse(JSON.stringify(this.paramList))
      this.initQuery()
      console.log("这里需要用局部状态管理来存储查询条件，和查询列表")
    },
    methods: {
      initQuery() {
        this.searchList = this.defaultQuerys.map(prop => ({
          prop: prop
        }))
      },
      handleQuery() {
        const querys = {}
  
        this.searchList.map(item => {
          if (item.prop && ![undefined, null, ''].includes(item.value)) {
            querys[item.prop] = item.value
          }
        })
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
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .el-form-item {
    margin: 0;
  }
  
  ::v-deep(.vue-treeselect__control) {
    transform: scaleY(0.77);
  }
  </style>
  