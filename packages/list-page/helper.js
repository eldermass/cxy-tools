import Cookies from "js-cookie"
import axios from "axios"

function getToken() {
    return Cookies.get("Admin-Token")
}

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8"

// 创建axios实例
const request = axios.create({
    timeout: 100000,
    // withCredentials: true
})

// request拦截器
request.interceptors.request.use(
    (config) => {
        // Do something before request is sent
        config.headers["Authorization"] = "Bearer " + getToken()
        return config
    },
    (error) => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response拦截器
request.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        if (error && error.response && error.response.status === 401) {
            // 401 清除token信息并跳转到登录页面
            Cookies.remove("Admin-Token")
            window.location.href = "/login"
        }
        return Promise.reject(error)
    }
)

export { request }
