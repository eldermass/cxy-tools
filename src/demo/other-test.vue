<template>
    <div>
        <select-tree v-model="treeValue" :options="options" :filterable="true" :muliple="true" :leafOnly="true" @change="handleChange" />
    </div>
</template>

<script>
import selectTree from '../../packages/select-tree/index.vue'

export default {
    name: "other-test",
    components: { selectTree },
    data() {
        return {
            options: [
                {
                    id: 1,
                    title: '一级 1',
                    children: [
                        {
                            id: 4,
                            title: '二级 1-1',
                            children: [
                                {
                                    id: 9,
                                    title: '三级 1-1-1'
                                },
                                {
                                    id: 10,
                                    title: '三级 1-1-2'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    title: '一级 2',
                    children: [
                        {
                            id: 5,
                            title: '二级 2-1'
                        },
                        {
                            id: 6,
                            title: '二级 2-2'
                        }
                    ]
                },
                {
                    id: 3,
                    title: '一级 3',
                    children: [
                        {
                            id: 7,
                            title: '二级 3-1'
                        },
                        {
                            id: 8,
                            title: '二级 3-2'
                        }
                    ]
                }
            ],
            treeValue: [9, 10]
        }
    },
    methods: {
        handleChange(val, node) {
            console.log("---", val, node)
        }
    }
}
</script>