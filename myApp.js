require('dotenv').config();
var express = require('express');
var app = express();

console.log("Hello World");

// app.get('/', function (req, res) {
//     res.send('Hello Express');
// })
var absoultePath = __dirname;

/* Middleware */
app.use('/public', express.static(absoultePath + '/public')); //serve static files

//Middleware with complete arguments: re,res,next
app.use(function (req, res, next) {
    let _res = `${req.method} ${req.path} - ${req.ip}`;
    console.log(_res);
    next();
});

app.get('/', function (req, res) {
    //send file to requested path using res.sendFile method
    res.sendFile(absoultePath + '/views/index.html');
})

app.get('/json', function (req, res) {
    var obj = { "message": "Hello json" };
    if (process.env.MESSAGE_STYLE === "uppercase") {
        obj.message = obj.message.toUpperCase();
        res.json(obj);
    }
    else {
        res.json(obj);
    }
});

module.exports = app;
