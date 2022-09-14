const express = require('express')
const router = express.Router()
const db = require('../models')

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

router.get('/edit/:id', async (req,res) => {
    try{
        const oneReflection = await db.reflection.findOne({
            where: {
                id: req.params.id
            }
        })
        // res.send(oneReflection)
        res.render('reflect/edit.ejs', {reflection: oneReflection})
    }catch(err){
        console.log(err)
    }
})
module.exports = router