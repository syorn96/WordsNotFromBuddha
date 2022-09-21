const express = require('express')
const router = express.Router()
const db = require('../models')

// GET /users/reflect -- render saved quotes/reflections based on verified user
router.get('/', async (req,res)=> {
    try{
        const user = await db.user.findOne({
            where: {
                email: res.locals.user.email
            },
            include: [{
                model: db.reflection}]
        })
        const savedQuotes = await user.getQuotes()
        const savedReflections = await user.getReflections()
        // res.send(savedReflections)
        // console.log(savedQuotes)
        res.render('reflect/show.ejs', {
            quotes: savedQuotes,
            reflections: savedReflections
        })
    }catch(err) {
        console.log(err)
    }
})

// DELETE /users/reflect/:id -- if user deletes a quote, delete reflections along with it
router.delete('/:id', async (req,res)=> {
    try{
        const user = await db.user.findOne({
            where: {email: res.locals.user.email}
        })
        const deleteQuote = await db.quote.destroy({
            where: { id: req.params.id }
        })
        const deleteReflection = await db.reflection.destroy({
            where: { quoteId: req.params.id }
        })
        const deleteUserQuote = await db.user_quotes.destroy({
            where: {
                userId: user.id,
                quoteId: req.params.id
            }
        })
        res.redirect('/users/reflect')
    }catch(err){
        console.log(err)
    }
})

// PUT /users/reflect/edit/:id -- update single reflection in reflection table
router.put('/edit/:id', async (req,res) => {
    console.log(req.body)
    try {
        const editReflection = await db.reflection.update({
            content: req.body.content,
        }, {
            where: { id: req.params.id }
        })
        res.redirect('/users/reflect')
    }catch(err){
        console.log(err)
    }
})

// DELETE /users/reflect/edit/:id -- delete single reflection in reflection table
router.delete('/edit/:id', async (req,res)=> {
    try{
        const deleteReflection = await db.reflection.destroy({
            where: {id: req.params.id }
        })
        res.redirect(`/users/reflect`)
    }catch(err){
        console.log(err)
    }
})

// GET /users/reflect/:id -- display all quotes and reflections pertaining to user
router.get('/:id', async (req,res)=> {
    console.log(req.params.id)
    try{
        const user = await db.user.findOne({
            where: {
                email: res.locals.user.email
            },
            include: [db.reflection]
        })
        const oneQuote = await user.getQuotes({
            where: {
                id: req.params.id
            }
        })
        const reflection = await user.getReflections({
            where: {
                quoteId: req.params.id
            }
        })
        // res.send(reflection)
        res.render('reflect/detail.ejs', {
            singleQuote: oneQuote,
            userInfo: user,
            reflection: reflection
        })
        // res.send(user)
    }catch(err){
        console.log(err)
    }
})

// POST /users/reflect/:id -- create a new reflection for specific quote
router.post('/:id', async (req,res)=>{
    try{
        const createReflection = await db.reflection.create({
                content: req.body.content,
                quoteId: req.body.quoteId,
                userId: req.body.userId
            })
        res.redirect('/users/reflect')
    }catch(err){
        console.log(err)
    }
})

// GET /users/reflect/edit/:id -- render form to edit specific reflection // display quote that pertains to that reflection
router.get('/edit/:id', async (req,res) => {
    try{
        const reflection = await db.reflection.findOne({
            where: {
                id: req.params.id
            },
            include: [db.quote]
        })
        res.render('reflect/edit.ejs', {
            reflection: reflection
        })
    }catch(err){
        console.log(err)
    }
})
module.exports = router