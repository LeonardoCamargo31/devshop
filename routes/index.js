//nesse modulo agregamos todas as rotas

const categoriaRouter = require('./categorias')
const produtoRouter = require('./produto')
const homeRouter = require('./home')
const autenticacaoController = require('../controllers/autenticacao')

const adminRouter = require('./admin')

const init = (db) => {
    const express = require('express')
    const router = express.Router()

    //rotas site
    router.use(homeRouter())
    router.use('/produto', produtoRouter(db))
    router.use('/categoria', categoriaRouter(db))

    //autenticação
    router.post('/login', autenticacaoController.login(db))
    router.get('/logout', autenticacaoController.logout)

    //rotas admin
    router.use('/admin', adminRouter(db))

    return router
}

module.exports = init