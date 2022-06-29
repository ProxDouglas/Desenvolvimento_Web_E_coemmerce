const mongoose = require('mongoose');
const express = require('express');
var app = express();
var session = require("express-session");
var flash = require("express-flash");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

connection().catch(err => console.log(err));

async function connection() {
  await mongoose.connect('mongodb+srv://groupLobtec:groupLobtec@e-commerce.pjmhya7.mongodb.net/?retryWrites=true&w=majority');
  console.log("Connect database")
}
