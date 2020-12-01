const express = require('express')
const path = require('path')
const cors = require('cors')
const loginRouter = require(path.join(__dirname, 'routers/login-router.js'))

const app = express()


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