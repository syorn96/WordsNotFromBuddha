const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/', async (req,res)=> {
    try{
        const user = await db.user.findOne({
            where: {
                email: res.locals.user.email
            }
        })
        const savedQuotes = await user.getQuotes()
        console.log(savedQuotes)
        res.render('reflect/show.ejs', {quotes: savedQuotes})
    }catch(err) {
        console.log(err)
    }
})

module.exports = router