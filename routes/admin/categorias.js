const init = (db) => {
    const express = require('express')
    const router = express.Router()
    const CategoriaController = require('../../controllers/categorias')

    router.get('/', CategoriaController.adminGetCategorias(db))
    router.get('/editar/:id', CategoriaController.adminGetCategorias(db))
    router.get('/excluir/:id', CategoriaController.adminGetCategorias(db))
    return router
}

module.exports = init 