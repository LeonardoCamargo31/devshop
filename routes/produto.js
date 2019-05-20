
const init = (db)=>{
    const express =require('express')
    const router = express.Router()
    const ProdutoController = require('../controllers/produto')

    router.get('/:id/:slug', ProdutoController.getProduto(db))

    return router
}


module.exports = init