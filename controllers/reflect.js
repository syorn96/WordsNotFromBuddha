const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/', async (req,res)=> {
    try{
        const savedQuotes = await db.quote.findAll()
        console.log(savedQuotes)
        res.render('reflect/show.ejs', {quotes: savedQuotes})
    }catch(err) {
        console.log(err)
    }
})

module.exports = router