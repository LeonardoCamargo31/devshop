//nesse modulo agregamos todas as rotas

const categoriaRouter = require('./categorias')
const produtoRouter = require('./produto')
const homeRouter = require('./home')
const autenticacaoController = require('../controllers/autenticacao')

const init = (db) => {
    const express = require('express')
    const router = express.Router()

    router.use(homeRouter())
    router.use('/produto', produtoRouter(db))
    router.use('/categoria', categoriaRouter(db))
    router.post('/login', autenticacaoController.login(db))
    router.get('/logout', autenticacaoController.logout)
    return router
}

module.exports = init