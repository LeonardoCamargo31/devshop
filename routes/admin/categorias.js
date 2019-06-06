const init = (db) => {
    const express = require('express')
    const router = express.Router()
    //injeto a dependencia
    const CategoriaController = require('../../controllers/categorias')(db)

    router.get('/', CategoriaController.adminGetCategorias)

    router.get('/nova', CategoriaController.adminCriarCategoria)
    router.post('/nova', CategoriaController.adminCriarCategoria)

    router.get('/editar/:id', CategoriaController.adminEditarCategoria)
    router.post('/editar/:id', CategoriaController.adminEditarCategoria)

    router.get('/excluir/:id', CategoriaController.adminRemoverCategoria)
    return router
}

module.exports = init 