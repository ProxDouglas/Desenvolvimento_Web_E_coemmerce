# Desenvolvimento_Web_E_coemmerce

### Links para criação do projeto
conection MongoDB: https://www.mongodb.com/docs/drivers/node/current/quick-start/ 

#### Links de conexão
mongodb shell : mongosh "mongodb+srv://e-commerce.pjmhya7.mongodb.net/myFirstDatabase" --apiVersion 1 --username groupLobtec 

nodejs: mongodb+srv://groupLobtec:groupLobtec@e-commerce.pjmhya7.mongodb.net/?retryWrites=true&w=majority

mongodb+srv://groupLobtec:groupLobtec@e-commerce.pjmhya7.mongodb.net/test

## Dependencias
npm init
npm install --save jsonwebtoken
npm install express --save
npm install body-parser --save
npm install express-session --save
npm install express-flash --save
npm install --save cookie-parser
npm install mongodb@4.7
npm install mongoose --save

## Rotas
POST: /usuario
PUT: /usuario
PUT: /usuario/:user_id/saldo
GET: /usuarios
GET: /usuario/:user_id

POST: /produto
PUT: /produto
DELETE: /produto/:produto_id
GET: /produtos
GET: /produto/:produto_id

POST: /anuncio/:usuario_id
PUT: /anuncio/:anuncio_id
DELETE: /anuncio/:anuncio_id
DELETE: /anuncio/:usuario_id
GET: /anuncio
GET: /anuncio/:user_id
GET: /anuncio/:produto_id
GET: /anuncio/:anuncio_id 
