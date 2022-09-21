const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')

// GET /users/meditate -- render list of 50 quotes through ZenQuotes API
router.get('/', (req,res) => {
    console.log(res.locals.user.email)
    axios.get(`https://zenquotes.io/api/quotes`)
    .then(response => {
        // console.log(response)
        res.render('meditate/show.ejs', { 
            quotes: response.data
        })
    })
})

// POST /users/meditate -- Save specific quote in Quote table
router.post('/', async (req,res) => {
    // console.log(req.body)
    console.log(res.locals.user)
    try{
        const [quote, quoteCreated] = await db.quote.findOrCreate({
            where: {
                content: req.body.content,
                author: req.body.author
            }
        })
        const user = await db.user.findOne({
            where: {
                email: res.locals.user.email
            }
        })
        await user.addQuote(quote)
    }catch(err){
        console.log(err)
    }
})

module.exports = router

