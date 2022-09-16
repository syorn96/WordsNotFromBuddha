// require packages
require('dotenv').config()
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const db = require('./models')
const crypto = require('crypto-js')
const methodOverride = require('method-override')
const path = require('path')
// config express/app
const app = express()
const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({ extended:false }))
app.use(cookieParser())
// app.use(express.static('public'))
app.use('/public', express.static('public'));
app.use('/users', express.static('users'))
app.use(express.static(path.join(__dirname, 'static')));
// app.use('/users/users', express.static('users'))

app.use(methodOverride("_method"));


//our custom auth middleware
app.use(async (req, res, next)=> {
    // console.log('hello from a middleware👋')
    res.locals.myData = 'hello, fellow route!'

    // if there is a cookie on the incoming request
    if(req.cookies.userId) {
        // decrypt the user id before we look up the user in the db
        const decryptedId = crypto.AES.decrypt(req.cookies.userId.toString(), process.env.ENC_SECRET)
        const decryptedIdString = decryptedId.toString(crypto.enc.Utf8)
        // look up the user in the db
        const user = await db.user.findByPk(decryptedIdString)
        // mount the user on the res.locals
        res.locals.user = user
    } else {
    // if there is no cookie -- set the user to be null in the res.locals
    res.locals.user = null 
    }

    // move on to the next route or middleware in the chain
    next()
}) 


// route definitions
app.get('/', (req,res) => {
    // console.log('incoming cookie 🍪', req.cookies)
    // console.log(res.locals.myData)
    console.log('the currently logged in user is:', res.locals.user)
    res.render('home.ejs')
})
app.get('/about', (req,res)=> {
    res.render('about.ejs')
})
// controllers
app.use('/users/intention', require('./controllers/intention'))
app.use('/users', require('./controllers/users'))
app.use('/users/meditate', require('./controllers/meditate'))
app.use('/users/reflect', require('./controllers/reflect'))

// listen on port
app.listen(PORT,() => {
    console.log(`Listening to sounds of the Himalayas on Port: ${PORT}`)
})