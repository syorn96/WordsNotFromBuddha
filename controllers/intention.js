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

router.get('/:id',(req,res)=> {
    res.send('Display a single quote on a digital visual board.')
})
module.exports = router