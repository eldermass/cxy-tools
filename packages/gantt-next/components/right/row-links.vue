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
            linksList: [
                // {
                //     source_id: 2,
                //     source_point: 'end',
                //     target_id: 11,
                //     target_point: 'start',
                //     group_id: 1
                // }
            ]
        }
    },
    computed: {
        ...mapStates({
            links: 'links'
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
