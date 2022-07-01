
const { isObjectIdOrHexString } = require("mongoose");
const Categoria = require("../models/Categoria");

const CategoriaController = {

    async createCategoria(req, res) {
        const bodyData = req.body;
        try{
            const newcategoria = await Categoria.create(bodyData);
            return res.status(200).json(newcategoria);
            
        }catch(err){
            console.log(req.body);
            return res.status(400).json(err);
        }
    },

    async getCategorias(req, res) {
        try {
            const categoria = await Categoria.find();
            return res.status(200).json(categoria);
        } catch(err){
            return res.status(400).json(err);
        }
    },

    async getCategoria(req, res){
        let {identificador} = req.params;

        if(isObjectIdOrHexString(identificador)){
            try {
                const cat = await Categoria.findById(identificador);
                return res.status(200).json(cat);
            } catch(err){
                return res.status(400).json(err);
            }
        }else {
            try {
                const cat = await Categoria.findOne({"nome": identificador});
                return res.status(200).json(cat);
            } catch(err){
                return res.status(400).json(err);
            }
        }
    },
    
    // async getCategoriaByID(req, res) {
    //     var {identificador} = req.params;
        
    //     try {
    //         const cat = await Categoria.findById(identificador);
    //         return res.status(200).json(cat);
    //     } catch(err){
    //         return res.status(400).json(err);
    //     }
    // },

    // async getCategoriaByName(req, res) {
    //     var {identificador} = req.params;
    //     console.log(req.params);
        
        
    //     try {
    //         const cat = await Categoria.findOne({"nome": identificador});
    //         return res.status(200).json(cat);
    //     } catch(err){
    //         return res.status(400).json(err);
    //     }
    // },

    /**
     * 
     * @param req 
     * @param res 
     *  O update de categoria só pode ser executada caso o atributo 
     * sub_categoria for = undefined
     */
    

    async updateCategoria(req, res){
        let cat = req.body;
        const {id_categoria} = req.params;
        
        try {
            const updateCat = await Categoria
                .findByIdAndUpdate(id_categoria, cat, {new: true})
            return res.status(200).json(updateCat)
        } catch(err) {
            return res.status(400).json(err)
        }
    },

    /**
     * 
     * @param req = sub-categoriaSchema
     *  Para adicionar a sub-Categoria é necessário dar um push na lista
     */

    async pushSubCategoria(req, res){
        let cat = req.body;
        const {id_categoria} = req.params;
        
        try {
            const updateCat = await Categoria
                .findByIdAndUpdate(
                    id_categoria, 
                    {$push:{sub_categoria: cat}}, 
                    {new: true}
                    )
            return res.status(200).json(updateCat)
        } catch(err) {
            return res.status(400).json(err)
        }
    },

    async listSubCategoria(req, res){
        let cat = req.body;
        const {id_categoria, id_subcat} = req.params;
        
        try {
            const updateCat = await Categoria
                .findByIdAndUpdate(
                    id_categoria, 
                    {$push:{sub_categoria: cat}}, 
                    {new: true}
                    )
            return res.status(200).json(updateCat)
        } catch(err) {
            return res.status(400).json(err)
        }
        
    },

    /**
     * É necessário discutir o output dessa função
     */

    async listSubCategoria(req, res){
        const {id_categoria} = req.params;
        
        try {
            const updateCat = await Categoria
                .find({_id: id_categoria}, 'sub_categoria' );
            return res.status(200).json(updateCat)
        } catch(err) {
            return res.status(400).json(err)
        }
    },

    async updateByIDSubCategoria(req, res){
        let catBody = req.body;
        const {id_categoria, id_subcat} = req.params;
        
        try {
            const categoria = await Categoria
                .findOne({ "_id": id_categoria, });

            if(catBody.nome != undefined){
                categoria.sub_categoria.id(id_subcat).nome = catBody.nome;
            }

            if(catBody.descricao){
                categoria.sub_categoria.id(id_subcat).nome = catBody.descricao;
            }

            const updateCat = await categoria.save();

            return res.status(200).json(updateCat)
        } catch(err) {
            return res.status(400).json(err)
        }
    },


    async deleteByIDSubCategoria(req, res){ //evitar usar (incompleto)
        const {id_categoria, id_subcat} = req.params;
        
        try {
            const categoria = await Categoria
                .findOne({ "_id": id_categoria, });
                
            
            categoria.sub_categoria.id(id_subcat).remove();
            

            const deleteCat = await categoria.save();

            return res.status(200).json(deleteCat)
        } catch(err) {
            return res.status(400).json(err)
        }
    }
    
}

module.exports = CategoriaController;