import Vue from "vue"
import serach from "./serach"
import page from './page'

export default Vue.extend({
    data() {
        return {
            states: {},
        }
    },
    mixins: [serach, page],
    methods: {},
})
