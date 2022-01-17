var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var methodOverride = require("method-override");

NODE_DB_URL_PRODUCTION = "mongodb://0.0.0.0:27017";
NODE_DB_USER_PRODUCTION = "root";
NODE_PWD_PRODUCTION = "password123";
NODE_DB_NAME_PRODUCTION = "blog";
var favicon = require("serve-favicon");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var registerRouter = require("./routes/register");

var app = express();
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
// app.set('view engine', 'jade');
// app.engine("ejs", require("express-ejs-extend"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      console.log("dddddddd");
      return method;
    }
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
// app.use("/register", registerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log(res);
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log("res.locals.message");

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(res.locals.message);

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

dbConfig = {
  url: NODE_DB_URL_PRODUCTION,
  user: NODE_DB_USER_PRODUCTION,
  pwd: NODE_PWD_PRODUCTION,
  dbName: NODE_DB_NAME_PRODUCTION,
};

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: dbConfig.user,
  pass: dbConfig.pwd,
  dbName: dbConfig.dbName,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "DB connection error:"));
db.once("open", () => console.log("DB connection successful"));

module.exports = app;
