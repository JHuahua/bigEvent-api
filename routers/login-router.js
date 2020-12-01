/* 
    拆分路由模块
*/
const express = require('express')
const path = require('path')
// 导入数据库通用模块
const db = require(path.join(__dirname, '../common.js'))
// 拆分路由模块，可以将路由添加到router对象上
// 在入口文件中通过app.use方法，把router中的路由配置到全局
var router = express.Router()

router.get('/test', async (req, res) => {
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
})

router.get('/data1', (req, res) => {
    res.send('data1')
})

module.exports = router