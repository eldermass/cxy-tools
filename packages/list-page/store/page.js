import { request } from "../helper";

export default {
  data() {
    return {
      states: {
        requestFunc: undefined,
        optionsCache: {}
      }
    };
  },

  methods: {
    request(...args) {
      if (this.states.requestFunc) {
        console.log("invoke outter request. ")
        return this.states.requestFunc.apply(this, args)
      }

      // 调用默认请求方法
      console.log("invoke inner request. ")
      return request.apply(this, args)
    },
    setOptionsCache(url) {
      if (this.states.optionsCache[url]) {
        return this.states.optionsCache[url]
      }

      this.states.optionsCache[url] = this.request(url)
      return this.states.optionsCache[url]
    }
  }
};
