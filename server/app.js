const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
require('./config/passport')(passport)
require('dotenv').config()
const port = process.env.PORT || 5000
const keys = JSON.parse(process.env.KEYS)
const path = require('path');
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')

const handleErrors = require('./middleware/handleErrors');
const { BadRequest } = require('./utils/erros');



//db key
const mongodbKey = keys.MongoURI;
//Connect to Mongo
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(mongodbKey)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

app.use(cookieParser())
//body-parser
app.use(bodyParser.json())
app.use(passport.initialize())
//Routes

app.use(express.static(path.join(__dirname, './client/build')));

app.use('/api', require('./routes/index.routes'))
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use(handleErrors)

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})