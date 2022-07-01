const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
const path = require("path");

//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// swagger especificações
const swaggerDocument = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce LobTec com NodeJS e MongoDB",
      version: "1.0.0"
    },
    servers: [
      {
      url: "http://localhost:45678/"
      }
    ]
  },
  apis: [`${path.join(__dirname, "./routes/*js")}`]
};

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

app.listen(3000, (req, res) => {
  console.log("Server Runner");
})

console.log("Connected to database")


app.use(cors())
app.use(express.json())
app.use(routes);
/*app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));*/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerDocument)));

app.listen(45678, () => console.log("Server Running"))

