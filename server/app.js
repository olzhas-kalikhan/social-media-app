const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const userRoutes = require('./routes/user.routes')
const authRoutes = require('./routes/auth.routes')
const passport = require('passport')
const AuthControllers = require('./controllers/auth.controllers')
require('dotenv').config()
//passport config
require('./config/passport')(passport)

//db key
const mongodbKey = keys.MongoURI;
//Connect to Mongo
mongoose.connect(mongodbKey, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))
//cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//body-parser
app.use(bodyParser.json())
//cookie-session
app.use(cookieSession({
    maxAge: 10 * 60 * 1000,
    keys: [keys.SessionKey]
}))
//passport 
app.use(passport.initialize())
app.use(passport.session())
//Routes
app.use('/', require('./routes/index.routes'))
app.use('/auth', authRoutes)
app.use('/user', AuthControllers.checkAuth, userRoutes)
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})