const Produto = require("../models/Produto")
class ProdutoController {

    async createProduto(req, res) {
        const bodyData = req.body
        try{
            const newProduto = await Produto.create(bodyData)
            return res.status(200).json(newProduto)
            
        }catch(err){
            return res.status(400).json(err)
        }
    }

    async getProdutos(req, res) {
        try {
            const produto = await Produto.find()
            return res.status(200).json(produto)
        } catch(err){
            return res.status(400).json(err)
        }
    }
    
    async getProdutoByID(req, res) {
        const  { id_produto }  = req.params
        try {
            const produto = await Produto.findById(id_produto)
            return res.status(200).json(produto)
        } catch(err){
            return res.status(400).json(err)
        }
    }

    async updateProdutoByID(req, res) {
        const bodyData = req.body
        const { id_produto } = req.params

        console.log(bodyData);
        console.log(id_produto);

        try {
            const updateProduto = await Produto.findOneAndUpdate({_id: id_produto}, bodyData, {new: true})
            console.log(updateProduto);

            return res.status(200).json(updateProduto)
        } catch(err) {
            return res.status(400).json(err)
        }
    } 

    async avaliacaoByIdProduto(req, res){
        let {id_produto} = req.params;
        let media, soma = parseFloat(0); 

        try{
            let produto = await Produto.findById(id_produto);

            if(produto != undefined && produto.avaliacao.length > 0){
                
                let i = 0;
                for(i; i < produto.avaliacao.length; i++){
                    soma = soma + parseFloat(produto.avaliacao[i].nota);
                }

                media = soma/parseFloat(produto.avaliacao.length);

                return res.status(200).json({media: media});
            }
            return res.status(404).json({Error: 'Produto não encontrado'});

        }catch(err){
            return res.status(400).json(err);
        }
    }

}

module.exports = new ProdutoController();