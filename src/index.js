const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
const path = require("path");

//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerDocument = require('../swagger.json');

var app = express();
var session = require("express-session");
var flash = require("express-flash");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");


const routes = require("./routes/routes");


connection().catch(err => console.log(err));

async function connection() {
  await mongoose.connect('mongodb+srv://groupLobtec:groupLobtec@e-commerce.pjmhya7.mongodb.net/E-commerce');

  console.log("Database Connected")
}

app.listen(7070, (req, res) => {
  console.log("Server Runner");
})

console.log("Connected to database")


app.use(cors())
app.use(express.json())
app.use(routes);

/*app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerDocument)));*/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(45678, () => console.log("Server Running"))

