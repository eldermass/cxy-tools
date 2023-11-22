<template>
    <el-button type="primary" icon="el-icon-download" :size="size" :loading="loading" @click="handleExport">
        导出
    </el-button>
</template>
  
<script>
import Cookies from 'js-cookie'
import axios from 'axios'

export default {
    name: 'ExportButton',
    props: {
        size: {
            type: String,
            default: 'mini'
        },
        // 请求方式
        requestMethod: {
            type: String,
            default: 'post'
        },
        // 下载地址
        downloadUrl: {
            type: String,
            default: '/bas/basic/material/exportExcel'
        },
        // 下载模板的参数
        downloadParams: {
            type: Object,
            default: () => ({})
        },
        // filename
        downloadFileName: {
            type: String,
            default: '物料信息'
        }
    },
    data() {
        return {
            loading: false,
            authHeader: { Authorization: 'Bearer ' + getToken() }
        }
    },
    methods: {
        async handleExport() {
            this.loading = true
            const axiosParams = {
                method: this.requestMethod,
                baseURL: process.env.VUE_APP_BASE_API,
                url: this.downloadUrl,
                responseType: 'blob',
                headers: this.authHeader
            }
            this.requestMethod === 'get' ? axiosParams.params = this.downloadParams : axiosParams.data = this.downloadParams
            const res = await axios(axiosParams).catch(() => {})
            this.loading = false

            if (!res.data) {
                this.$message.error('未知后端错误')
                return
            }

            if (!(res.data instanceof Blob)) {
                const message = res.data.msg || res.data.message || '未知后端错误'
                this.$message.error(message)
                return
            }

            // 后端返回的是json格式的错误信息
            if (res.data.type === 'application/json') {
                res.data.text().then((text) => {
                    const message = JSON.parse(text).msg || JSON.parse(text).message || '未知后端错误'
                    this.$message.error(message)
                })
                return
            }

            downloadExportData(res.data, this.downloadFileName)
        }
    }
}

function getToken() {
    return Cookies.get('Admin-Token')
}

function downloadExportData(data, filename, ext = 'xlsx') {
    const exportName = getExportName(filename, ext)
    const objUrl = window.URL.createObjectURL(new Blob([data]))
    const aTag = document.createElement("a")

    aTag.style.display = "none"
    aTag.href = objUrl
    aTag.setAttribute("download", exportName)
    document.body.appendChild(aTag)

    aTag.click()
    aTag.remove()
}

function getExportName(name, ext = 'xlsx') {
    const date_string = new Date().toLocaleString()
        .replaceAll(/\//img, '-')
        .replaceAll(/:/img, '')
    return `${name}_${date_string}.${ext}`
}
</script>
  
<style scoped></style>
  