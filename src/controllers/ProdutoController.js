const Produto = require("../models/Produto")
const ProdutoController = {

    async createProduto(req, res) {
        const bodyData = req.body
        try{
            const newProduto = await Produto.create(bodyData)
            return res.status(200).json(newProduto)
            
        }catch(err){
            return res.status(400).json(err)
        }
    },

    async getProdutos(req, res) {
        try {
            const produto = await Produto.find()
            return res.status(200).json(produto)
        } catch(err){
            return res.status(400).json(err)
        }
    },
    
    async getProdutoByID(req, res) {
        const  { id_produto }  = req.params
        try {
            const produto = await Produto.findById(id_produto)
            return res.status(200).json(produto)
        } catch(err){
            return res.status(400).json(err)
        }
    },

    async updateProdutoByID(req, res) {
        const bodyData = req.body
        const { produto_id } = req.params

        try {
            const updateProduto = await Produto.findByIdAndUpdate(produto_id, bodyData)
            return res.status(200).json(updateProduto)
        } catch(err) {
            return res.status(400).json(err)
        }
    }  
}

module.exports = ProdutoController;