var createError = require("http-errors");
require("dotenv").config();
var express = require("express");
const fileUpload = require("express-fileupload");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var session = require("express-session");
var flash = require("connect-flash");
var cors = require("cors");
var connect = require("./src/db");
var app = express();
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(cors());
app.use(cookieParser());
app.use(session({ secret: "123", resave: false, saveUninitialized: false }));

app.use(flash());
var sessionFlash = function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
};
app.use(sessionFlash);
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/site", express.static("static"));

app.use(logger("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));

require("./src/route/coursecategory")(app);
require("./src/route/subcategory")(app);
require("./src/route/courses")(app);
require("./src/route/event")(app);
require("./src/route/testimonial")(app);
require("./src/route/youlearn")(app);
require("./src/route/cirriclum")(app);
require("./src/route/cirriclumsubtopics")(app);
require("./src/route/certification")(app);
require("./src/route/jobprofile")(app);
require("./src/route/tag")(app);
require("./src/route/enuire")(app);
require("./src/route/icon")(app);

app.use(function (req, res, next) {
  next(createError(404));
});
console.log("connection", connect);
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.removeHeader("X-Powered-By");
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );

  res.locals.message = err.message;
  console.log(err.message);
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page

  res.status(err.status || 500);
  res.send({ success: false, message: "Api Not Found", data: [] });
});

module.exports = app;
