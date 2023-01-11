<template>
    <transition name="fade">
        <div class="setting-layer" v-if="isVisible">
            <div class="setting-header">设置</div>
            <div class="setting-body">
                <div class="setting-row">
                    吸附类型：
                    <input type="radio" name="adsorb" value="0" v-model="adsorbType" />无
                    <input type="radio" name="adsorb" value="1" v-model="adsorbType" />小时
                    <input type="radio" name="adsorb" value="2" v-model="adsorbType" />天
                </div>
                <div class="setting-row">
                    单日宽度：
                    <input class="setting-input" type="number" name="dayWidth" v-model="dayWidth" />
                </div>
                <div class="setting-row">
                    <button class="setting-button setting-button-mini" @click="changeViewWidth(500)">时视图</button>
                    <button class="setting-button setting-button-mini" style="margin-left: 10px;"
                        @click="changeViewWidth(120)">日视图</button>
                    <button class="setting-button setting-button-mini" style="margin-left: 10px;"
                        @click="changeViewWidth(15)">周视图</button>
                </div>

                <div class="setting-row" style="font-size: 8px; color: #aaa;">
                    提示: ctrl + 滚动 可微调视图
                </div>


                <div class="setting-row">
                    <button class="setting-button" @click="clear">清空</button>
                    <button class="setting-button" style="margin-left: 10px;" @click="save">保存</button>
                </div>

                <transition name="fade2">
                    <div class="setting-mask" v-if="showMask">
                        <h1 style="margin-top: 50px">操作成功</h1>
                    </div>
                </transition>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'setting-layer',
    props: {
        freshSetting: {
            type: Function
        }
    },
    data() {
        return {
            adsorbType: 0,
            dayWidth: 0,
            isVisible: false,
            showMask: false
        }
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            this.adsorbType = localStorage.getItem('gant_adsorb_type') || 0
            this.dayWidth = localStorage.getItem('gant_day_width') || 60
        },
        changeViewWidth(width) {
            this.dayWidth = width
        },
        save() {
            localStorage.setItem('gant_adsorb_type', this.adsorbType)
            localStorage.setItem('gant_day_width', this.dayWidth)
            this.hide()
        },
        clear() {
            localStorage.removeItem('gant_adsorb_type')
            localStorage.removeItem('gant_day_width')
            this.hide()
        },
        show() {
            this.initData()
            this.isVisible = true
        },
        hide() {
            this.showMask = true
            if (typeof this.freshSetting === 'function') this.freshSetting() 
            setTimeout(() => {
                this.showMask = false
                this.isVisible = false
            }, 500)
        }
    },
}
</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}

.setting-layer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .setting-header {
        padding: 18px 20px;
        border-bottom: 1px solid #ebeef5;
        box-sizing: border-box;
    }

    .setting-body {
        padding: 20px;
        position: relative;

        .setting-row {
            margin-bottom: 15px;
        }

        .setting-input {
            -webkit-appearance: none;
            background-color: #fff;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            font-size: inherit;
            height: 30px;
            line-height: 30px;
            outline: none;
            padding: 0 15px;
            transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
            width: 135px;
        }

        .setting-button {
            display: inline-block;
            line-height: 1;
            white-space: nowrap;
            cursor: pointer;
            background: #fff;
            border: 1px solid #dcdfe6;
            color: #606266;
            -webkit-appearance: none;
            text-align: center;
            box-sizing: border-box;
            outline: none;
            margin: 0;
            transition: .1s;
            font-weight: 500;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            padding: 10px 20px;
            font-size: 14px;
            border-radius: 4px;

            &:hover {
                color: #409eff;
                border-color: #c6e2ff;
                background-color: #ecf5ff;
            }
        }

        .setting-button-mini {
            padding: 7px 15px;
            font-size: 12px;
            border-radius: 3px;
        }

        .setting-mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.8);
        }
    }

}

.fade-enter-active,
.fade-leave-active {
    transition: all .5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
    {
    opacity: 0;
    transform: scale(0.5) translate(-100%, -100%);
}

.fade2-enter-active,
.fade2-leave-active {
    transition: all .3s;
}

.fade2-enter,
.fade2-leave-to

/* .fade-leave-active below version 2.1.8 */
    {
    opacity: 0;
}
</style>