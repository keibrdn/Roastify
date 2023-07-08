
var createError = require("http-errors");
var path = require("path");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var querystring = require("querystring");
var axios = require("axios");
require('dotenv').config({path:'../.env'});
var { Configuration, OpenAIApi } = require("openai");


var config = new Configuration({apiKey: process.env.OPENAI_API_KEY,});
var openai = new OpenAIApi(config);

var app = express();
var client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
var client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
var redirect_uri = "http://localhost:9000/callback"; // Your redirect uri

var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/test", (req, res, next) => {
  res.send("API is working properly");
});

app.get("/", (req, res) => {
  res.send("bro");
});

app.get("/login", function (req, res) {
  var state = generateRandomString(16);
  var scope = "user-read-private user-read-email user-top-read";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

app.post("/openai", async (req,res) => {
  let requestData = req.body

  let names = requestData.name.map(obj => obj.name);

  console.log("artists received by server: ", names)

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": `Pretend you are a stand up comedian. An individual has asked you to "roast" them based on their musical tastes. In a single paragraph, give a sarcastic and comical assessment of the stereotypical personality traits and quirks a person may when their top artists include: ${names[0]}, ${names[1]}, ${names[2]}`}],
    });
    res.send(completion.data.choices[0].message);
  } catch (err) {
    console.log(err);
  }
  
  
});

app.get("/callback", (req, res) => {
  var code = req.query.code || null;
  var state = req.query.state || state;

  if (state === null) {
    res.redirect("/#" + querystring.stringify({ error: "state_mismatch" }));
  } else {


    //define post request params
    const url = "https://accounts.spotify.com/api/token";
    const form = {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirect_uri,
    };
    const headers = {
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    };

    //request tokens
    axios
      .post(url, form, {
        headers: {
          Authorization:
            "Basic " +
            new Buffer.from(client_id + ":" + client_secret).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          var body = response.data;
          var access = body.access_token
          var refresh = body.refresh_token

          res.redirect('http://localhost:3000/results/#' + querystring.stringify({
            access_token: access,
            refresh_token: refresh,
          }))
        } else {
          console.log("error")
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data); // => the response payload
        }
      });

  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
