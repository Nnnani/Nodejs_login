const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')

mongoose.connect('mongodb+srv://Nana06:Nana17120609@cluster0.cwuajwo.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

global.loggedIn = null


const indexcontroller = require('./controllers/indexcontroller')
const logincontroller = require('./controllers/logincontroller')
const registercontroller = require('./controllers/registercontroller')
const storeusercontroller = require('./controllers/storeusercontroller')
const loginusercontroller = require('./controllers/loginusercontroller')
const logoutcontroller = require('./controllers/logoutcontroller')
const homecontroller = require('./controllers/homecontroller')


const redirectifauth = require('./middleware/redirectifauth')
const authmiddleware = require('./middleware/authmiddleware')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.use(expressSession( {
    secret: "node secret"
}))

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})

app.set('view engine', 'ejs')

app.get('/', indexcontroller)
app.get('/home', authmiddleware, homecontroller)
app.get('/login', redirectifauth, logincontroller)
app.get('/register', redirectifauth, registercontroller)
app.post('/user/register', redirectifauth, storeusercontroller)
app.post('/user/login', redirectifauth, loginusercontroller)
app.get('/logout', logoutcontroller)

app.listen(4000, () => {
    console.log("App listening on port 4000")
})