const express = require('express')
const router = express.Router()
const db = require('../models')
const crypto = require('crypto-js')
const bcrypt = require('bcrypt')
const axios = require('axios')
const determineSign = require('../public/script')
const { response } = require('express')
let sign = null
// GET /users/new -- render a form to create a new user
router.get('/new', (req,res) => {
    res.render('users/new.ejs')
})

// POST /users -- create a new user in the db
router.post('/', async (req,res)=> {
    try {
        // hash the password from the req.body
        // create a new user
        const hashedPassword = bcrypt.hashSync(req.body.password, 12)
        const [newUser, created] = await db.user.findOrCreate({
            where: {
                email: req.body.email,
                username: req.body.username,
                birthMonth: req.body.month,
                birthDay: req.body.day
            },
            defaults: {
                password: hashedPassword
            }
        })
        // if the user was found... send them to the login form
        if (!created) {
            console.log('user already exists')
            res.redirect('users/login?message=Please log into your account to contine.')

        } else {
            const encryptedUserId = crypto.AES.encrypt(newUser.id.toString(), process.env.ENC_SECRET)
            const encryptedUserIdString = encryptedUserId.toString()
            res.cookie('userId', encryptedUserIdString)
            // redirect to the homepage
            res.redirect('/users/profile')
        }
        // store that new user's id as a cookie in the browser
        // res.cookie('key', value)
    }catch(err) {
        console.log(err)
        res.send('server error')
    }
})

// GET /users/login -- show a login form to the user
router.get('/login', (req,res)=> {
    res.render('users/login.ejs', {
        message: req.query.message ? req.query.message: null
    })
})

// POST /users/login -- accept a payload of form data and use it log a user in
router.post('/login', async (req,res)=> {
    try{
        // look up user in db using the supplied email
        const user = await db.user.findOne({ 
            where: {
                email: req.body.email
            }
        })
        const noLoginMessage = 'Incorrect username or password'
        // if the user is not found -- send the user back to the login form
        if(!user) {
            console.log('user not found')
            res.redirect('/users/login?message=' + noLoginMessage)
            // if the user is found, but has given the wrong password -- send them back to the login form
        } else if(!bcrypt.compareSync(req.body.password, user.password)) {
            console.log('wrong password')
            res.redirect('/users/login?message=' + noLoginMessage)
        // if the user is found and the supplied password matches what is in DB, -- log them in
        } else {
            const encryptedUserId = crypto.AES.encrypt(user.id.toString(), process.env.ENC_SECRET)
            const encryptedUserIdString = encryptedUserId.toString()
            res.cookie('userId', encryptedUserIdString)
            res.redirect('/users/profile')
        }

    }catch(err){
        console.log(err)
        res.send('server error')
    }
})

// GET /users/logout -- log out a user by clearing the stored cookie
router.get('/logout', (req,res)=> {
    // clear the cookie
    res.clearCookie('userId')
    // redirect to homepage
    res.redirect('/')
})

router.get('/profile', async (req,res)=> {
    // if the user is not logged ... we need to redirect to the login form
    if(!res.locals.user) {
        res.redirect('/users/login?message=You must authenticate before you are authorized to view this resource.')
        // otherwise, show them their profile
    } else {
        try {
            const user = await db.user.findOne({
                where: {
                    email: res.locals.user.email
                }
            })
            let month = user.birthMonth
            let day = user.birthDay
            let sign = determineSign(month, day)
            // res.send(`${month} + ${sign} + ${day}`)
    
            const URL = `https://aztro.sameerkumar.website/?sign=${sign}&day=yesterday`
            axios.post(URL)
            .then((response) => {
                horoscope = response.data
                res.render('users/profile.ejs', {
                    user: res.locals.user,
                    horoscope: response.data,
                    sign: sign
                })
            })

        }catch(err) {
            console.log(err)
        }
        
    }
})

module.exports = router