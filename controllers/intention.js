const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/', (req,res)=> {
    res.render('intention/show.ejs')
})

router.get('/:id',(req,res)=> {
    res.send('Display a single quote on a digital visual board.')
})
module.exports = router