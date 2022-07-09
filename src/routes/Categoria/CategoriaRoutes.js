//Importa o express
const { Router } = require("express");
// Importa o arquivo de autenticação
const auth = require("../../middlewares/Autenticacao");

const CategoriaController = require("../../controllers/CategoriaController");

const routes = Router();


//---------------------------Categoria-------------------------------------------
// Criar Categoria
routes.post("/", auth, CategoriaController.createCategoria);
// Atualizar Categoria
routes.put("/:id_categoria", auth, CategoriaController.updateCategoria);
// Listar Categorias
routes.get("/", CategoriaController.getCategorias);
// Listar categoria pelo ID
routes.get("/:identificador", CategoriaController.getCategoria);
// Criar Sub-categorias
routes.post("/:id_categoria/subcategorias", auth, CategoriaController.pushSubCategoria);
//Listar sub-categorias
routes.get("/:id_categoria/subcategorias", CategoriaController.listSubCategoria);
// Atualizar sub-categorias por ID
routes.put("/:id_categoria/subcategorias/:id_subcat", auth, CategoriaController.updateByIDSubCategoria);
// Deletar sub-categorias
routes.delete("/:id_categoria/subcategorias/:id_subcat", auth, CategoriaController.deleteByIDSubCategoria);



module.exports = routes;