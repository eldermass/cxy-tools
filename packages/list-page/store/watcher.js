import Vue from "vue"
import serach from "./serach"
// import current from './current'

export default Vue.extend({
    data() {
        return {
            states: {},
        }
    },
    mixins: [serach],
    methods: {},
})
