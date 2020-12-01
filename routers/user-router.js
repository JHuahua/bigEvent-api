/* 
    用户信息模块
*/

const express = require('express')
const path = require('path')
const router = express.Router()
const utility = require('utility')
const db = require(path.join(__dirname, '../common.js'))

// 获取用户信息接口
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


// 重置密码接口
router.post('/updatepwd', async (req, res) => {
    // 1.获取信息
    let id = req.user.id
    let params = req.body
    params.oldPwd = utility.md5(params.oldPwd)
    params.newPwd = utility.md5(params.newPwd)
    // 2.更新数据库
    let sql = 'update myuser set password = ? where id = ? and password = ?'
    let ret = await db.operateDb(sql, [params.newPwd, id, params.oldPwd])
    // 3.根据查询结果返回数据
    if (ret && ret.affectedRows > 0) {
        res.json({
            status: 0,
            message: '更新密码成功'
        })
    } else {
        res.json({
            status: 1,
            message: '更新密码失败'
        })
    }
})

module.exports = router