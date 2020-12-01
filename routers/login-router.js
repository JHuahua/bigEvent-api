/* 
    拆分路由模块
*/
const express = require('express')
var router = express.Router()

router.get('/test', (req, res) => {
    res.send('test')
})

router.get('/data1', (req, res) => {
    res.send('data1')
})

module.exports = router