<template>
    <div class="date-list-container" ref="container">
        <div class="month-wrapper" :style="monthsStyle" ref="months">
            <div class="month-container" v-for="(item, index) in monthsList" :key="index" ref="month">
                <div class="month" :style="{ width: item.dates.length * dayBoxWidth + 'px' }">
                    {{ item.year }}-{{ item.month }}
                </div>
                <div class="date-cotainner">
                    <div :class="{ 'date-item': true, 'date-monday': monthShow && date.day === 1, 'date-month-show': monthShow }"
                        v-for="(date, index) in item.dates" :style="{ width: dayBoxWidth + 'px' }" :key="index">
                        {{ !monthShow || date.day === 1 ? date.date : '' }}
                        <div class="marks-container">
                            <div class="hours-mark"
                                v-show="(dayBoxWidth >= 40 && dayBoxWidth <= 150 && t % 6 === 0) || dayBoxWidth > 150"
                                :style="{
                                    width: dayBoxWidth / 24 + 'px',
                                    height: dayBoxWidth <= 150 ? '6px' : t % 6 === 0 ? '10px' : '6px',
                                    left: dayBoxWidth / 24 * t + 'px'
                                }" v-for="t in 23" :key="t"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapStates } from "../../store/helper";

export default {
    name: "date-list",
    props: {
        store: {
            required: true,
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
        };
    },
    computed: {
        ...mapStates({
            monthsStyle: (state) => ({ width: state.daysList.length * state.dayBoxWidth + 'px' }),
            monthsList: (state) => formatList(state.daysList),
            dayBoxWidth: "dayBoxWidth",
            monthShow: state => state.dayBoxWidth <= 18
        }),
    },
    methods: {
        scrollTo(x, maxWidth) {
            this.$refs.container && this.$refs.container.scrollTo(x, 0);

            // 处理滚动的最后一个角
            if (!maxWidth) return;
            const offset = maxWidth - x;
            if (offset <= 7) {
                this.$refs.months.style.transform = `translateX(-${7 - offset}px)`;
            } else {
                this.$refs.months.style.transform = null;
            }
        },
    },
};

// 将 day[] 格式化为 type dateList
function formatList(list) {
    const groups = {
        // '2022-8': []
    };

    list.forEach((item) => {
        const key = `${item.year}-${item.month}`;
        if (!groups[key]) {
            groups[key] = [item];
        } else {
            groups[key].push(item);
        }
    });
    const formattedList = Object.entries(groups).map((entry) => {
        const ym = entry[0].split("-");
        return {
            year: ym[0],
            month: ym[1].length < 2 ? "0" + ym[1] : ym[1],
            dates: entry[1],
        };
    });

    return formattedList;
}
</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}

.date-list-container {
    user-select: none;
    height: 60px;
    // border: 1px solid;
    background: #f5f5f5;
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
                border-right: none;
            }

            .date-cotainner {
                .date-item {
                    height: 30px;
                    display: inline-block;
                    border-left: 1px solid #ccc;
                    border-bottom: 1px solid #ccc;
                    text-align: center;
                    position: relative;

                    .marks-container {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        height: 10px;
                        width: 100%;
                        font-size: 0;

                        .hours-mark {
                            position: absolute;
                            bottom: 0;
                            height: 5px;
                            border-left: 1px solid #ccc;
                        }
                    }
                }

                .date-month-show {
                    vertical-align: top;
                    border-left: none;
                    border-right: none;
                    font-size: 10px;
                }

                .date-monday {
                    border-left: 1px solid #ccc;
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


            &:last-of-type {
                .month {
                    border-right: 1px solid #ccc;
                }

                .date-cotainner {
                    .date-item {
                        &:last-of-type {
                            border-right: 1px solid #ccc;
                        }
                    }
                }
            }
        }
    }
}
</style>
