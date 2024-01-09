<template>
    <cxy-button @click="open">{{ title }}</cxy-button>
</template>
  
<script>
export default {
    name: 'cxy-open-dir',
    props: {
        type: {
            type: String,
            default: 'file'
        }
    },
    data() {
        return {
            title: this.type === 'file' ? '选择文件' : '选择文件夹'
        }
    },
    methods: {
        async open() {
            if (this.type === 'file') {
                await this.openFile()
            } else {
                await this.openDir()
            }
        },
        async openFile() {
            const handle = await window.showOpenFilePicker(this.$attrs).catch(() => {})
            if (!handle) {
                return
            }

            this.$emit('change', handle)
        },
        async openDir() {
            const handle = await window.showDirectoryPicker(this.$attrs).catch(() => {})
            if (!handle) {
                return
            }

            const handleTree = await this.processHandle(handle)
            this.$emit('change', handleTree)
        },
        // 递归处理句柄
        async processHandle(handle) {
            if (handle.kind === 'file') {
                return
            }

            handle.children = []
            const iter = await handle.entries()
            for await (const entry of iter) {
                await this.processHandle(entry[1])
                handle.children.push(entry[1])
            }
            return handle
        },
        // 从句柄中读取文件
        async getFileFromHandle(handle) {
            const file = await handle.getFile()

            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = () => {
                    resolve(reader.result)
                }
                reader.onerror = reject
                reader.readAsText(file)
            })
        }
    }
}
</script>
  
<style scoped></style>
  