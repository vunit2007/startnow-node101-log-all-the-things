const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
var moment = require('moment');
var object = [];


app.use((req, res, next) => {
    // write your logging code here
    var Agent = req.headers['user-agent'];
    //console.log("agent test", agent);
    var Time = moment().utc().format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z";
    //console.log('Time Test:', time);
    var Method = req.method;
    //console.log("method test",method);
    var Resource = req._parsedUrl['path'];
    //console.log("resource test", resource);
    var Version = "HTTP/" + req.httpVersion; //Do i need to put "http/" to get it to show up?
    //console.log("version test",version);
    var Status = "200"
    //console.log("status is", status);
    console.log(Agent + "," + Time + "," + Method + "," + Resource + "," + Version + "," + Status);
    var userInfo = '\n' + Agent + "," + Time + "," + Method + "," + Resource + "," + Version + "," + Status;

    var userInfo = 
        {
            Agent: req.headers['user-agent'],
            Time: moment().utc().format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z",
            Method: req.method,
            Resource: req._parsedUrl['path'],
            Version: "http/" + req.httpVersion,
            Status: "200",
        };
object.push(userInfo);
    fs.appendFile(path.resolve(__dirname, 'log.csv'), userInfo, function (err) {
        if (err) throw err;
        //   console.log({userInfo});
    });

    next();
});


app.get('/', (req, res) => {
    // write your code to respond "ok" here

    res.status(200).send("ok"); // figure out
});
//next(); Do we need this?

app.get('/logs', (req, res) => {
    // write your code to return a json object containing the log data here
    res.json(object);
});


// app.get('/blah', (req, res) => {
//     res.send('you just typed blah');
// });
module.exports = app;
