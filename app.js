// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.LName;
  var email = req.body.Email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: " https://us4.api.mailchimp.com/3.0/lists/b1d0d33810",
    method: "POST",
    headers: {
      "Authorization": "a1 1c4f23fa07950c6ce47a6800577cf8ec-us4"
    },
    // body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if(response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server 3000");
});

// api key
// 1c4f23fa07950c6ce47a6800577cf8ec-us4

// list id
// b1d0d33810

//heroku
//process.env.PORT
