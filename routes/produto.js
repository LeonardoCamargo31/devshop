
const init = (db)=>{
    const express =require('express')
    const router = express.Router()
    const ProdutoController = require('../controllers/produto')(db)

    router.get('/:id/:slug', ProdutoController.getProduto)

    return router
}


module.exports = init