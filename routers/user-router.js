/* 
    用户信息模块
*/

const express = require('express')
const path = require('path')
const router = express.Router()
const db = require(path.join(__dirname, '../common.js'))

router.get('/userinfo', async (req, res) => {
    // 1.获取用户标识id
    let id = req.user.id
    // 2.查询数据库
    let sql = 'select id,username,nickname,email,user_pic from myuser where id = ?'
    let ret = await db.operateDb(sql, id)
    // 3.根据查询结果返回数据
    if (ret && ret.length > 0) {
        res.json({
            status: 0,
            message: '获取用户信息成功',
            data: ret[0]
        })
    } else {
        res.json({
            status: 1,
            message: '获取用户信息失败'
        })
    }
})

module.exports = router