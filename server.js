// server.js
// where your node app starts




//const expresslayout=require('express-ejs-layouts')

const expresslayout=require('ejs')
const path=require("path")

const mongoose=require('mongoose')
//database connection
const url =process.env.Mongo_url;
mongoose.connect(url,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:true})
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('database connected')
}).catch(err=>{console.log("connection failed")})

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

               // http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));



//app.use(expresslayout)
app.set('views',path.join(__dirname,'/views'))
console.log(__dirname,'/views')
app.set('view engine','ejs')


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  //res.sendFile(__dirname + '/views/index.html');
  res.render('hello')
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  let dateString = req.params.date_string;

  //A 4 digit number is a valid ISO-8601 for the beginning of that year
  //5 digits or more must be a unix time, until we reach a year 10,000 problem
  if (/\d{5,}/.test(dateString)) {
    const dateInt = parseInt(dateString);
    //Date regards numbers as unix timestamps, strings are processed differently
    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  } else {
    let dateObject = new Date(dateString);
  
    if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    }
  }


});





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
