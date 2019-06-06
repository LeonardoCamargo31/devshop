//primeiro passo o db, depois retorno a rota
const init = (db) => {
    //no express temos um roteador, um cara que podemos agrupar rotas
    //e depois podemos adicionar esse roteador pro meu projeto principal
    const express = require('express')
    const router = express.Router()//criando um novo roteador
    const CategoriaController = require('../controllers/categorias')(db)

    //injetando o db
    //aqui não temos mais app, então router.get
    router.get('/:id/:slug', CategoriaController.getCategoria)
    return router
}

module.exports = init //exportamos a função que o primeiro parametro passa o db e que retorna a rota