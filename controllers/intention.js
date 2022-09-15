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
        // res.send(savedQuotes)
    res.render('intention/show.ejs', {quotes: savedQuotes})
    }catch(err){
        console.log(err)
    }
})

router.get('/:id', async (req,res)=> {
    try{
        const oneQuote = await db.quote.findOne({
            where: {
                id: req.params.id
            }
        })
        res.render('intention/detail.ejs', {aQuote: oneQuote})
    }catch(err){
        console.log(err)
    }
})
module.exports = router