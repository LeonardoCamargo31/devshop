const init = (db) => {
    const express = require('express')
    const router = express.Router()
    const CategoriaController = require('../../controllers/categorias')

    router.get('/', CategoriaController.adminGetCategorias(db))

    router.get('/nova', CategoriaController.adminCriarCategoria(db))
    router.post('/nova', CategoriaController.adminCriarCategoria(db))

    router.get('/editar/:id', CategoriaController.adminEditarCategoria(db))
    router.post('/editar/:id', CategoriaController.adminEditarCategoria(db))

    router.get('/excluir/:id', CategoriaController.adminRemoverCategoria(db))
    return router
}

module.exports = init 