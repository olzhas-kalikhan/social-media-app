require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const port = normalizePort(process.env.PORT || "3001");
const connectionString = process.env.MONGO_CONNECTION_STRING;
const userRouter = require('./controllers/user/user.routes');

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/user", userRouter);
app.listen(port, async () => {
    try {
        await mongoose.connect(connectionString,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            });
    }
    catch (err) { console.log(err) }
    console.log(`Example app listening at http://localhost:${port}`)
})

