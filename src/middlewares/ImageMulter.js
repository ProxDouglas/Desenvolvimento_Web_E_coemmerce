// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
const imgModel = require('../models/Imagem');

var multer = require('multer');

var storage = multer.memoryStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
// const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

module.exports = upload;