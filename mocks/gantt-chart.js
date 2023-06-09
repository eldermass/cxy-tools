export const links = [
    {
        source_id: 2,
        source_point: "end",
        target_id: 5,
        target_point: "start",
        group_id: 1,
    },
    {
        source_id: 2,
        source_point: "end",
        target_id: 11,
        target_point: "start",
        group_id: 1,
    },
    {
        source_id: 7,
        source_point: "end",
        target_id: 9,
        target_point: "start",
        group_id: 2,
    },
    {
        source_id: 9,
        source_point: "end",
        target_id: 8,
        target_point: "start",
        group_id: 2,
    },
    {
        source_id: 9,
        source_point: "end",
        target_id: 1,
        target_point: "end",
        group_id: 2,
    },
    {
        source_id: 6,
        source_point: "end",
        target_id: 4,
        target_point: "start",
        group_id: 3,
    },
]

export const tasks = [
    {
        task_id: 1,
        text: "1111111111111",
        row_index: 0,
        start_date: "2023-01-13 12:00:00",
        duration: 2.5,
        theme: "lightpurple",
        is_lock: false,
        data: {
            hello: '我是一只鱼'
        },
    },
    {
        task_id: 2,
        text: "222222222222",
        row_index: 3,
        start_date: "2023-01-03 12:06:00",
        duration: 2.5,
        theme: "purple",
        is_lock: true,
        data: {},
    },
    {
        task_id: 3,
        text: "t3333333333333333333333",
        row_index: 4,
        end_date: "2023-01-08 21:01:25",
        start_date: "2023-01-08 14:02:15",
        duration: 0.29108796296296297,
        theme: "mediumpurple",
        is_lock: false,
        data: {},
    },
    {
        task_id: 13,
        text: "13-13-13-13-13-13",
        row_index: 4,
        start_date: "2023-01-08 21:01:25",
        duration: 2.8,
        theme: "pink",
        is_lock: false,
        data: {},
    },
    {
        task_id: 4,
        text: "4444444444",
        row_index: 9,
        start_date: "2023-01-12 12:00:00",
        duration: 2.8,
        theme: "cyan",
        is_lock: false,
        data: {},
    },
    {
        task_id: 5,
        text: "55555555",
        row_index: 1,
        start_date: "2023-01-10 10:46:00",
        duration: 2.8,
        theme: "red",
        is_lock: true,
        data: {},
    },
    {
        task_id: 6,
        text: "66666666666",
        row_index: 9,
        start_date: "2023-01-10 12:00:00",
        duration: 2,
        theme: "skyblue",
        is_lock: false,
        data: {},
    },
    {
        task_id: 7,
        text: "7777777777777777777",
        row_index: 8,
        start_date: "2023-01-05 12:00:00",
        duration: 4,
        theme: "orange",
        is_lock: false,
        data: {},
    },
    {
        task_id: 8,
        text: "88888888888888888",
        row_index: 10,
        start_date: "2023-01-15 16:00:00",
        duration: 2.8,
        theme: "blue",
        is_lock: false,
        data: {},
    },
    {
        task_id: 9,
        text: "999999999999999999",
        row_index: 5,
        start_date: "2023-01-09 12:00:00",
        duration: 3.8,
        theme: "lightpink",
        is_lock: false,
        data: {},
    },
    {
        task_id: 10,
        text: "1010110101010101",
        row_index: 11,
        start_date: "2023-01-18 03:00:00",
        duration: 2.8,
        theme: "yellow",
        data: {},
    },
    {
        task_id: 11,
        text: "十一1111111",
        row_index: 3,
        start_date: "2023-01-16 00:00:00",
        duration: 40,
        theme: "gray",
        is_lock: true,
        data: {},
    },
]

export const titleGroups = [
    {
        title: "2 号楼 1 楼SMT车间",
        length: 5,
    },
    {
        title: "2 号楼 3 楼SMT车间",
        length: 4,
    },
    {
        title: "2 号楼 4 楼SMT车间",
        length: 6,
    },
]

export default [
    {
        id: 1,
        name: "SMT-A1",
        items: [
            {
                id: 1,
                title: "M2208018STA-P",
                startAt: "2022-08-02",
                endAt: "2022-08-08",
            },
            {
                id: 2,
                title: "M2208018STA-P2",
                themeType: "blue",
                startAt: "2022-08-09",
                endAt: "2022-08-10",
            },
            {
                id: 3,
                title: "M2208018STA-P3",
                startAt: "2022-08-15",
                endAt: "2022-08-16",
                themeType: "cyan",
            },
            {
                id: 4,
                title: "M2208018STA-P3",
                startAt: "2022-08-17",
                endAt: "2022-08-18",
                themeType: "red",
            },
            {
                id: 5,
                title: "M2208018STA-P3",
                startAt: "2022-08-19",
                endAt: "2022-08-20",
                themeType: "yellow",
            },
            {
                id: 6,
                title: "M2208018STA-P3",
                startAt: "2022-08-21",
                endAt: "2022-08-22",
                themeType: "orange",
                lock: true,
            },
        ],
    },
    {
        id: 2,
        name: "SMT-A2",
        items: [
            {
                id: 22,
                title: "M2208013STA",
                startAt: "2022-08-09",
                endAt: "2022-08-11",
            },
            {
                id: 12,
                title: "M2208013STA2",
                startAt: "2022-08-12",
                endAt: "2022-08-12",
                themeType: "blue",
            },
            {
                id: 32,
                title: "M2208013STA3",
                themeType: "blue",
                startAt: "2022-08-13",
                endAt: "2022-08-27",
            },
        ],
    },
    {
        id: 3,
        name: "SMT-A3",
        items: [
            {
                id: 12,
                title: "M2208012SA-A",
                startAt: "2022-08-01",
                endAt: "2022-08-07",
            },
            {
                id: 22,
                title: "M2208012SA-A2",
                startAt: "2022-08-09",
                endAt: "2022-08-09",
            },
            {
                id: 32,
                title: "M2208012SA-A3",
                themeType: "purple",
                startAt: "2022-08-15",
                endAt: "2022-08-17",
            },
            {
                id: 122,
                title: "M2208012SA-A4",
                startAt: "2022-08-20",
                endAt: "2022-08-31",
            },
        ],
    },
    {
        id: 4,
        name: "SMT-A4",
        items: [
            {
                id: 12,
                title: "M2208017SA-A",
                themeType: "purple",
                startAt: "2022-08-05",
                endAt: "2022-08-07",
            },
            {
                id: 22,
                title: "M2208017SA-A2",
                startAt: "2022-08-19",
                endAt: "2022-08-19",
            },
            {
                id: 32,
                title: "M2208017SA-A3",
                themeType: "purple",
                startAt: "2022-08-23",
                endAt: "2022-08-27",
            },
        ],
    },
    {
        id: 5,
        name: "SMT-A5",
        items: [
            {
                id: 12,
                title: "M2208015SA-P-B",
                themeType: "green",
                startAt: "2022-08-05",
                endAt: "2022-08-07",
            },
            {
                id: 22,
                title: "M2208015SA-P-B2",
                startAt: "2022-08-09",
                endAt: "2022-08-15",
            },
            {
                id: 32,
                title: "M2208015SA-P-B3",
                themeType: "green",
                startAt: "2022-09-13",
                endAt: "2022-09-27",
            },
        ],
    },
    {
        id: 6,
        name: "SMT-A6",
        items: [
            {
                id: 12,
                title: "M2208002TA-B",
                startAt: "2022-08-05",
                endAt: "2022-08-07",
            },
            {
                id: 22,
                title: "M2208002TA-B2",
                themeType: "green",
                startAt: "2022-08-29",
                endAt: "2022-09-11",
            },
            {
                id: 32,
                title: "M2208002TA-B3",
                startAt: "2022-09-13",
                endAt: "2022-09-17",
            },
        ],
    },
    {
        id: 7,
        name: "SMT-A7",
        items: [
            {
                id: 12,
                title: "M2207263STA",
                themeType: "green",
                startAt: "2022-08-05",
                endAt: "2022-08-07",
            },
            {
                id: 22,
                title: "M2207263STA2",
                startAt: "2022-08-19",
                endAt: "2022-08-24",
            },
            {
                id: 32,
                title: "M2207263STA3",
                startAt: "2022-09-01",
                endAt: "2022-09-07",
            },
        ],
    },
    {
        id: 8,
        name: "SMT-A8",
        items: [
            {
                id: 12,
                title: "M2207261SA-A",
                startAt: "2022-08-05",
                endAt: "2022-08-07",
            },
            {
                id: 22,
                title: "M2207261SA-A2",
                startAt: "2022-08-09",
                endAt: "2022-08-11",
            },
            {
                id: 32,
                title: "M2207261SA-A3",
                themeType: "green",
                startAt: "2022-08-13",
                endAt: "2022-08-27",
            },
        ],
    },
    {
        id: 9,
        name: "SMT-A9",
        items: [
            {
                id: 12,
                title: "M2207263STA",
                startAt: "2022-08-08",
                endAt: "2022-08-09",
            },
            {
                id: 22,
                title: "M2207263STA2",
                startAt: "2022-08-12",
                endAt: "2022-08-14",
            },
            {
                id: 32,
                title: "M2207263STA3",
                startAt: "2022-09-01",
                endAt: "2022-09-05",
            },
        ],
    },
    {
        id: 10,
        name: "SMT-A10",
        items: [
            {
                id: 12,
                title: "M2208015SA-P-B",
                startAt: "2022-08-02",
                endAt: "2022-08-07",
            },
            {
                id: 22,
                title: "M2208015SA-P-B2",
                startAt: "2022-08-13",
                endAt: "2022-08-16",
            },
            {
                id: 32,
                title: "M2208015SA-P-B3",
                startAt: "2022-08-19",
                endAt: "2022-08-23",
            },
        ],
    },
    {
        id: 11,
        name: "SMT-A11",
        items: [
            {
                id: 12,
                title: "M2208008STA",
                startAt: "2022-08-05",
                endAt: "2022-08-07",
            },
            {
                id: 22,
                title: "M2208008STA2",
                themeType: "green",
                startAt: "2022-08-09",
                endAt: "2022-08-11",
            },
            {
                id: 32,
                title: "M2208008STA3",
                themeType: "blue",
                startAt: "2022-08-13",
                endAt: "2022-08-27",
            },
        ],
    },
    {
        id: 12,
        name: "SMT-A12",
        items: [
            {
                id: 12,
                title: "M2207261SA-A",
                startAt: "2022-08-03",
                endAt: "2022-08-05",
            },
            {
                id: 22,
                title: "M2207261SA-A2",
                themeType: "green",
                startAt: "2022-08-15",
                endAt: "2022-08-18",
            },
            {
                id: 32,
                title: "M2207261SA-A3",
                startAt: "2022-08-23",
                endAt: "2022-08-27",
            },
        ],
    },
    {
        id: 13,
        name: "SMT-A13",
        items: [
            {
                id: 12,
                title: "M2207254SA-P-B",
                startAt: "2022-08-03",
                endAt: "2022-08-05",
            },
            {
                id: 22,
                title: "M2207254SA-P-B2",
                startAt: "2022-08-09",
                endAt: "2022-08-15",
            },
            {
                id: 32,
                title: "M2207254SA-P-B3",
                startAt: "2022-08-25",
                endAt: "2022-09-07",
            },
        ],
    },
    {
        id: 14,
        name: "SMT-A14",
        items: [
            {
                id: 12,
                title: "M2207244SA-B",
                startAt: "2022-08-05",
                endAt: "2022-08-07",
            },
            {
                id: 22,
                title: "M2207244SA-B2",
                startAt: "2022-08-09",
                endAt: "2022-08-11",
            },
            {
                id: 32,
                title: "M2207244SA-B3",
                startAt: "2022-08-13",
                endAt: "2022-08-27",
            },
        ],
    },
    {
        id: 15,
        name: "SMT-A15",
        items: [
            {
                id: 12,
                title: "M2207199SA-B",
                startAt: "2022-08-05",
                endAt: "2022-08-07",
            },
            {
                id: 22,
                title: "M2207199SA-B2",
                startAt: "2022-08-09",
                endAt: "2022-08-11",
            },
            {
                id: 32,
                title: "M2207199SA-B3",
                startAt: "2022-08-13",
                endAt: "2022-08-27",
            },
        ],
    },
]
