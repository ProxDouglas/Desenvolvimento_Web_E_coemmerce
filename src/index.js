const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
var app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
// var session = require("express-session");
// var flash = require("express-flash");
// var bodyParser = require("body-parser");
// var cookieParser = require("cookie-parser");



const routes = require("./routes/routes");


connection().catch(err => console.log(err));

async function connection() {
  await mongoose.connect('mongodb+srv://groupLobtec:groupLobtec@e-commerce.pjmhya7.mongodb.net/E-commerce');
  // await mongoose.connect('mongodb://localhost:27017/e-commerce');

  console.log("Database Connected")
}


// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors())
app.use(express.json())
app.use(routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(45678, () => console.log("Server Running"));
console.log("Listening at:// port:%s (HTTP)", 45678);


