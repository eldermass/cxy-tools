<template>
    <div class="row-links">
        <row-links-item v-for="(link, index) in links" :key="index" :store="store" :link="link" />
    </div>
</template>
<script>
import rowLinksItem from "./row-links-item.vue"
import { mapStates } from "../../store/helper"

export default {
    name: "row-links",
    components: { rowLinksItem },
    props: {
        store: {
            required: true
        }
    },
    data() {
        return {
            links: [
                // 连线覆盖测试，不删
                {
                    source_id: 2,
                    source_point: 'end',
                    target_id: 11,
                    target_point: 'start',
                    group_id: 1
                },
                // {
                //     source_id: 2,
                //     source_point: 'start',
                //     target_id: 3,
                //     target_point: 'start',
                //     group_id: 1
                // },
                // {
                //     source_id: 2,
                //     source_point: 'end',
                //     target_id: 1,
                //     target_point: 'end',
                //     group_id: 1
                // },
                // {
                //     source_id: 4,
                //     source_point: 'end',
                //     target_id: 3,
                //     target_point: 'start',
                //     group_id: 1
                // },
                // {
                //     source_id: 4,
                //     source_point: 'start',
                //     target_id: 1,
                //     target_point: 'end',
                //     group_id: 1
                // },
                // step 5
                // {
                //     source_id: 4,
                //     source_point: 'end',
                //     target_id: 3,
                //     target_point: 'start',
                //     group_id: 1
                // },
                // {
                //     source_id: 5,
                //     source_point: 'start',
                //     target_id: 4,
                //     target_point: 'end',
                //     group_id: 2
                // },
                // {
                //     source_id: 6,
                //     source_point: 'end',
                //     target_id: 4,
                //     target_point: 'start',
                //     group_id: 2
                // },
                // {
                //     source_id: 4,
                //     source_point: 'end',
                //     target_id: 1,
                //     target_point: 'start',
                //     group_id: 2
                // },
                // {
                //     source_id: 4,
                //     source_point: 'start',
                //     target_id: 8,
                //     target_point: 'end',
                //     group_id: 2
                // },
                // {
                //     source_id: 4,
                //     source_point: 'start',
                //     target_id: 10,
                //     target_point: 'end',
                //     group_id: 2
                // },
                // step 6
                // {
                //     source_id: 4,
                //     source_point: 'end',
                //     target_id: 7,
                //     target_point: 'start',
                //     group_id: 1
                // },
                // {
                //     source_id: 3,
                //     source_point: 'end',
                //     target_id: 6,
                //     target_point: 'start',
                //     group_id: 2
                // },
                // {
                //     source_id: 4,
                //     source_point: 'start',
                //     target_id: 1,
                //     target_point: 'end',
                //     group_id: 2
                // },
                {
                    source_id: 4,
                    source_point: 'end',
                    target_id: 8,
                    target_point: 'start',
                    group_id: 2
                }
            ]
        }
    },
    computed: {
        ...mapStates({
            linksList: 'links'
        }),
    },
    mounted() {
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}

.row-links {
    pointer-events: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
</style>
