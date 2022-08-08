export default class FormatDate {
    constructor(days = 10) {
        this.list = this.getDateList(days)
    }
    
    static addDays(date_string, days = 1) {
        const time_stamp = new Date(date_string).getTime()
        const new_date = new Date(time_stamp + days * 86400000)
        const year = new_date.getFullYear()
        const month = new_date.getMonth() + 1
        const date = new_date.getDate()
        return `${year}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`
    }

    /**
     * @param {number} length 后推日期长度
     * @param {Date} time_stamp 起始时间
     * @param {number} step 跨度
     * @returns
     */
    getDateList(length = 3, time_stamp = Date.now(), step = 1) {
        var date_list = []

        for (let i = 0; i < length; i++) {
            date_list.push(this.getDateItem(i, time_stamp, step))
        }
        return date_list
    }

    getDateItem(index, time_stamp, step) {
        const new_date = new Date(time_stamp + index * 86400000 * step)
        const year = new_date.getFullYear()
        const month = new_date.getMonth() + 1
        const date = new_date.getDate()
        const day = new_date.getDay()

        const is_last_date = date === this.getCurrentMonthDays(year, month)
        const is_last_month = month === 12

        const item = {
            year,
            month,
            date,
            day,
            is_last_date,
            is_last_month,
            date_string: `${year}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`,
        }

        return item
    }

    getCurrentMonthDays(full_year, month) {
        return new Date(full_year, month, 0).getDate()
    }

    /**
     * 格式化传入数据
     * @param {*} outData
     * @param {*} list datelist
     */
    getDataItemList(outData, list) {
        // console.log(outData, list)
        // 过滤结束时间小于当前的任务
        outData = outData.filter((item) => new Date(item.endAt).getTime() + 86400000 > Date.now())
        const result = []
        let cursor = 0

        list.forEach((day) => {
            const dataItem = outData[cursor]
            // 如果没有数据，都返回day 1
            if (!dataItem) {
                result.push({
                    days: 1,
                    data: {},
                    startDay: day,
                })
                return
            }

            const isInRange = this.isInDateRange(day.date_string, dataItem.startAt, dataItem.endAt)
            if (isInRange === "end") cursor++
            // 如果是结果的第一个就先放一个进去
            if (!result.length) {
                result.push({
                    days: 1,
                    data: isInRange ? dataItem : {},
                    startDay: day,
                    endDay: day
                })
            } else if (isInRange) {
                const lastItem = result[result.length - 1]
                if (lastItem.data === dataItem) {
                    // 延申天数
                    lastItem.days++
                } else {
                    result.push({
                        days: 1,
                        data: dataItem,
                        startDay: day,
                    })
                }

                const newLastItem = result[result.length - 1]
                newLastItem && (newLastItem.endDay = day)
            } else {
                // 范围之外
                result.push({
                    days: 1,
                    data: {},
                    startDay: day,
                })
            }
        })
        // console.log(result)
        return result
    }
    isInDateRange(value, startAt, endAt) {
        if (value === endAt) {
            return "end"
        }
        if (value === startAt) {
            return "start"
        }

        const start = new Date(startAt)
        const end = new Date(endAt)
        const val = new Date(value)
        return start < val && val < end
    }
}

// 必须有起始时间，且时间不可有重叠
// {
//     id: 1,
//     title: "ASD456",
//     startAt: "2022-08-05",
//     endAt: "2022-08-09"
// }

// 转

// [
//     {
//         days: 2,
//         data: { id: 1, title: 'SDH418'},
//         startDay: day,
//         endDay: day
//     }
// ]
