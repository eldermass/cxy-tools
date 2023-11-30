const http = require("http")
const url = require("url")

const jsonData = {
    code: 200,
    message: "success",
    data: {
        pageSize: 50,
        pageNo: 1,
        recordsTotal: 0,
        data: [
            { id: 1, name: "hello" },
            { id: 2, name: "world" },
        ],
        orders: null,
    },
}

const server = http.createServer((req, res) => {
    // 解析请求路径
    const parsedUrl = url.parse(req.url, true)

    // 设置跨域头部
    res.setHeader("Access-Control-Allow-Origin", "*") // 允许所有来源
    res.setHeader("Access-Control-Allow-Methods", "GET") // 允许的请求方法
    res.setHeader("Access-Control-Allow-Headers", "Content-Type") // 允许的请求头
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization") // 允许的请求头

    // 处理预检请求（OPTIONS请求）
    if (req.method === "OPTIONS") {
        res.writeHead(200)
        res.end()
        return
    }

    // 处理路由
    if (parsedUrl.pathname === "/api/data" && req.method === "GET") {
        // 设置响应头
        res.setHeader("Content-Type", "application/json")

        // 返回JSON数据
        res.end(JSON.stringify(jsonData))
    } else {
        // 处理未知路由
        res.statusCode = 404
        res.end({
            code: 404,
            message: "Not Found"
        })
    }
})

// 启动服务器
const PORT = process.env.PORT || 3333
server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})
