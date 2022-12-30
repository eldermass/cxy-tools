const hasOwnProperty = Object.prototype.hasOwnProperty

class Subscriber {
    constructor() {
      this.handles = {}
    }
  
    // 订阅事件
    subscribe(eventType, handle) {
      if (!hasOwnProperty.call(this.handles, eventType)) {
        this.handles[eventType] = []
      }
  
      if (typeof handle == 'function') {
        this.handles[eventType].push(handle)
      } else {
        throw new Error('缺少回调函数')
      }
      return this
    }
  
    // 发布事件
    publish(eventType, ...args) {
      if (hasOwnProperty.call(this.handles, eventType)) {
        this.handles[eventType].forEach((fn) => {
          fn.apply(null, args)
        })
      } else {
        throw new Error(`"${eventType}"事件未注册`)
      }
      return this
    }
  
    // 删除事件
    unsubscribe(eventType, handle) {
      if (!hasOwnProperty.call(this.handles, eventType)) {
        throw new Error(`"${eventType}"事件未注册`)
      } else if (typeof handle != 'function') {
        throw new Error('缺少回调函数')
      } else {
        this.handles[eventType].forEach((item, key, arr) => {
          if (item == handle) {
            arr.splice(key, 1)
          }
        })
      }
      return this
    }
  }
  
  export default Subscriber
  