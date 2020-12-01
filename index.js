const express = require('express')
const path = require('path')
const cors = require('cors')
const jwt = require('express-jwt')
// 导入路由模块
const loginRouter = require(path.join(__dirname, 'routers/login-router.js'))
const userRouter = require(path.join(__dirname, 'routers/user-router.js'))
const articleRouter = require(path.join(__dirname, 'routers/article-router.js'))

const app = express()

// 解析token并验证token的合法性，如果解析失败直接返回错误状态401
// 以/my开头的都需要验证token，从token中解析出用户id，然后以user属性的方法添加到req对象中
// req.user = {id: 1}
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
app.use('/my', articleRouter)

app.use((err, req, res, next) => {
    if (err) {
        res.status(401).json({
            status: 401,
            message: '没有权限获取信息'
        })
    }
})