const express = require('express')
const router = express.Router()
const db = require('../models')

// GET /users/intention -- render all saved quotes w/o author & reflection
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
// GET /users/intention/:id -- render single quote on virtual vision board
router.get('/:id', async (req,res)=> {
    try{
        const oneQuote = await db.quote.findOne({
            where: {
                id: req.params.id
            }
        })
        res.render('intention/visionboard.ejs', {aQuote: oneQuote})
    }catch(err){
        console.log(err)
    }
})
module.exports = router