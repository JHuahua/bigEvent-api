/* 
    拆分路由模块
*/
const express = require('express')
const utility = require('utility')
const path = require('path')
// 导入数据库通用模块
const db = require(path.join(__dirname, '../common.js'))
// 拆分路由模块，可以将路由添加到router对象上
// 在入口文件中通过app.use方法，把router中的路由配置到全局
var router = express.Router()

// 注册接口
router.post('/reguser', async (req, res) => {
    // 1.获取客户端提交数据
    let params = req.body

    // 对密码进行加密
    params.password = utility.md5(params.password)

    // 判断数据中是否已经存在该用户名
    let csql = 'select id from myuser where username = ?'
    let flag = await db.operateDb(csql, params.username)
    if (flag && flag.length > 0) {
        res.json({
            status: 1,
            message: '用户名已存在'
        })
        return
    }
    // 2.添加到数据库
    let sql = 'insert into myuser set ?'
    let ret = await db.operateDb(sql, params)
    // 3.得到返回结果
    if (ret && ret.affectedRows > 0) {
        res.json({
            status: 0,
            message: '注册成功',
        })
    } else {
        res.json({
            status: 1,
            message: '注册失败'
        })
    }
})


/* router.get('/test', async (req, res) => {
    let sql = 'select * from message'
    let ret = await db.operateDb(sql, null)
    if (ret && ret.length > 0) {
        res.json({
            status: 0,
            message: '获取数据成功',
            data: ret
        })
    } else {
        res.json({
            status: 1,
            message: '数据库操作失败'
        })
    }
}) */

/* router.get('/data1', (req, res) => {
    res.send('data1')
}) */

module.exports = router