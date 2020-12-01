/* 
    文章类别模块
*/

const express = require('express')
const path = require('path')
const router = express.Router()
const db = require(path.join(__dirname, '../common.js'))

// 获取文章类别列表接口
router.get('/article/cates', async (req, res) => {
    // 1.从数据库查询所有文章信息
    let sql = 'select * from myarticle'
    let ret = await db.operateDb(sql, null)
    // 2.根据查询信息返回结果
    if (ret && ret.length > 0) {
        res.json({
            status: 0,
            message: '获取文章类别列表成功',
            data: ret
        })
    } else {
        res.json({
            status: 1,
            message: '获取文章类别列表失败'
        })
    }
})


// 新增文章分类接口
router.post('/article/addcates', async (req, res) => {
    // 1.获取信息
    let params = req.body
    // 2.添加数据到数据库
    let sql = 'insert into myarticle set ?'
    let ret = await db.operateDb(sql, params)
    // 3.根据添加信息返回结果
    if (ret && ret.affectedRows > 0) {
        res.json({
            status: 0,
            message: '新增文章分类成功'
        })
    } else {
        res.json({
            status: 1,
            message: '新增文章分类失败'
        })
    }
})


// 删除文章分类接口
router.get('/article/deletecate/:id', async (req, res) => {
    // 1.获取数据(要删除的文章分类id)
    let id = req.params.id
    // 2.根据id删除数据库中对应数据
    let sql = 'delete from myarticle where id = ?'
    let ret = await db.operateDb(sql, id)
    // 3.根据删除信息返回结果
    if (ret && ret.affectedRows > 0) {
        res.json({
            status: 0,
            message: '删除文章分类成功'
        })
    } else {
        res.json({
            status: 1,
            message: '删除文章分类失败'
        })
    }
})


// 更新文章分类接口
router.post('/article/updatecate', async (req, res) => {
    // 1.获取数据
    let params = req.body
    // 2.更新数据库数据
    let sql = 'update myarticle set name = ?, alias = ? where id = ?'
    let ret = await db.operateDb(sql, [params.name, params.alias, params.id])
    // 3.根据更新数据返回结果
    if (ret && ret.affectedRows > 0) {
        res.json({
            status: 0,
            message: '更新分类信息成功'
        })
    } else {
        res.json({
            status: 1,
            message: '更新分类信息失败'
        })
    }
})

module.exports = router