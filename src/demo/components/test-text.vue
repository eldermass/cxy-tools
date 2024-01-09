<template>
    <div class="test-text" :style="style">
        注册插件
    </div>
</template>

<script>
export default {
    name: 'test-text',
    data() {
        return {
            red: 50,
            green: 100,
            blue: 200,
        }
    },
    computed: {
        style() {
            return {
                color: `rgb(${this.red}, ${this.green}, ${this.blue})`
            }
        }
    },
    methods: {
        changeColor() {
            const step = 100, dir = Math.random() > 0.5 ? 1 : -1
            const red = dir * Math.floor(Math.random() * step) + this.red
            const green = dir * Math.floor(Math.random() * step) + this.green
            const blue = dir * Math.floor(Math.random() * step) + this.blue
            this.red = Math.min(Math.max(red, 0), 255)
            this.green = Math.min(Math.max(green, 0), 255)
            this.blue = Math.min(Math.max(blue, 0), 255)
        }
    },
    mounted() {
        setInterval(() => {
            this.changeColor()
        }, 1000)
    }
}    
</script>
<style lang="scss" scoped>
.test-text {
    transition: all 1s ease-in-out;
    display: inline-block;
}
</style>
