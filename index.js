const express = require('express')
const path = require('path')
const cors = require('cors')
const jwt = require('express-jwt')
// 导入路由模块
const loginRouter = require(path.join(__dirname, 'routers/login-router.js'))
const userRouter = require(path.join(__dirname, 'routers/user-router.js'))

const app = express()

app.use(jwt({ secret: 'bigevent' }).unless({ path: /^\/api/ }));

// 处理客户端请求post参数
// for parsing application/json
app.use(express.json()) 
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })) 

// 配置跨域
app.use(cors())

app.listen(8888, () => {
    console.log('running...');
})

// app.get('/data', (req, res) => {
//     res.send('hello')
// })

app.use('/api', loginRouter)
app.use('/my', userRouter)

app.use((err, req, res, next) => {
    if (err) {
        res.status(401).json({
            status: 401,
            message: '没有权限获取信息'
        })
    }
})