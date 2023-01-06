/**
 * @param {number} length 后推日期长度
 * @param {Date} time_stamp 起始时间
 * @param {number} step 跨度
 * @returns
 */
export function getDateList(length = 3, time_stamp = Date.now(), step = 1) {
    if (typeof time_stamp === 'string') {
        time_stamp = new Date(time_stamp).getTime()
    }
    var date_list = []

    for (let i = 0; i < length; i++) {
        date_list.push(getDateItem(i, time_stamp, step))
    }
    return date_list
}

function getDateItem(index, time_stamp, step) {
    const new_date = new Date(time_stamp + index * 86400000 * step)
    const year = new_date.getFullYear()
    const month = new_date.getMonth() + 1
    const date = new_date.getDate()
    const day = new_date.getDay()

    const is_last_date = date === getCurrentMonthDays(year, month)
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

function getCurrentMonthDays(full_year, month) {
    return new Date(full_year, month, 0).getDate()
}
