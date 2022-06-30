const { restart } = require("nodemon")
const Usuario = require("../../models/Usuario")
const userModel = require("../../models/Usuario")
const UserController = {

    async createUser(req, res) {
        const bodyData = req.body
        //const novoUsuario = mongoose.model("user", userModel);
        try{

            const newUser = await Usuario.create(bodyData)
            return res.status(200).json(newUser)
            
        }catch(err){
            console.log(req.body)
            return res.status(400).json(err)
        }
    },

    async getUser(req, res) {
        try {
            const users = await Usuario.find()
            return res.status(200).json(users)
        } catch(err){
            return res.status(400).json(err)
        }
    },
    
    async getUserByID(req, res) {
        var userID = req.params
        console.log(userID)
        try {
            const user = await Usuario.findById(userID)
            return res.status(200).json(user)
        } catch(err){
            return res.status(400).json(err)
        }
    }
    
}

module.exports = UserController;