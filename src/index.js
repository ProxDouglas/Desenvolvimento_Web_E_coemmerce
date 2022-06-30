const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
var app = express();
var session = require("express-session");
var flash = require("express-flash");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

<<<<<<< Updated upstream
=======
const routes = require("./routes/routes")
>>>>>>> Stashed changes

connection().catch(err => console.log(err));

async function connection() {
  await mongoose.connect('mongodb+srv://groupLobtec:groupLobtec@e-commerce.pjmhya7.mongodb.net/?retryWrites=true&w=majority');
<<<<<<< Updated upstream
  console.log("Database Connected")
}

app.listen(3000, (req, res) => {
  console.log("Server Runner");
})
=======
  console.log("Connected to database")
}

app.use(cors())
app.use(express.json())
app.use(routes);

app.listen(45678, () => console.log("Server Running"))
>>>>>>> Stashed changes
