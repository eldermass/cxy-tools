<template>
    <div class="date-list-container" ref="container">
        <div class="month-wrapper" ref="months">
            <div class="month-container" v-for="(item, index) in dateList" :key="index" ref="month">
                <div class="month" :style="item.dates.length === 1 ? 'width: 30px' : ''">{{ item.year }}-{{ item.month }}</div>
                <div class="date-cotainner">
                    <div class="date-item" v-for="(date, index) in item.dates" :key="index">
                        {{ date }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "date-list",
    props: {
        list: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            dateList: [
                // {
                //     year: 2022,
                //     month: 8,
                //     dates: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
                // },
            ],
        }
    },
    methods: {
        formatList(list) {
            const groups = {
                // '2022-8': []
            }

            list.forEach((item) => {
                const key = `${item.year}-${item.month}`
                if (!groups[key]) {
                    groups[key] = [item.date]
                } else {
                    groups[key].push(item.date)
                }
            })
            const formattedList = Object.entries(groups).map((entry) => {
                const ym = entry[0].split("-")
                return {
                    year: ym[0],
                    month: ym[1].length < 2 ? "0" + ym[1] : ym[1],
                    dates: entry[1],
                }
            })

            return formattedList
        },
        calcMonthsWidth() {
            // const monthList = this.$refs.month
            const monthsRef = this.$refs.months

            const len = this.dateList.map(item => item.dates.length).reduce((a, b) => a + b)

            const width = len * 30
            // const width = monthList.reduce((a, b) => {
            //     if (typeof a === "number") {
            //         return a + b.offsetWidth
            //     } else {
            //         return a.offsetWidth + b.offsetWidth
            //     }
            // })
            // 这里可以直接 *30
            console.log("calc width: ", width)
            monthsRef.style.width = `${width}px`
        },
        scrollTo(x, maxWidth) {
            this.$refs.container && this.$refs.container.scrollTo(x, 0)

            // 处理滚动的最后一个角
            if (!maxWidth) return
            const offset = maxWidth - x
            if (offset <= 7) {
                this.$refs.months.style.transform = `translateX(-${7 - offset}px)`
            } else {
                this.$refs.months.style.transform = null
            }
        },
    },
    watch: {
        list(newList) {
            if (newList.length) {
                this.dateList = this.formatList(newList)
                this.$nextTick(() => {
                    this.calcMonthsWidth()
                })
            }
        },
    },
}
</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}
.date-list-container {
    height: 60px;
    // border: 1px solid;
    background: #b3b3b3;
    overflow: hidden;
    .month-wrapper {
        text-align: left;
        background: white;
        .month-container {
            display: inline-block;
            line-height: 30px;
            .month {
                height: 30px;
                border: 1px solid #ccc;
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .date-cotainner {
                .date-item {
                    height: 30px;
                    width: 30px;
                    display: inline-block;
                    border: 1px solid #ccc;
                    text-align: center;
                }
            }
            &:nth-of-type(1) {
                .month {
                    border-left: none;
                }
                .date-cotainner {
                    .date-item {
                        &:nth-of-type(1) {
                            border-left: none;
                        }
                    }
                }
            }
        }
    }
}
</style>
