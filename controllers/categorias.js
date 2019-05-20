const Categoria = require('../models/categoria')
const Produto = require('../models/produto')

//injetando o db
const getCategoria = (db) => async (req, res) => {
    //passo o db, e depois chamo a função
    const produtos = await Produto.getProdutosPorIdCategoria(db)(req.params.id)
    const categoria = await Categoria.getCategoriaPorId(db)(req.params.id)
    res.render('categoria', {
        categoria,
        produtos
    })
}

const getCategorias = async (db) => {
    return await Categoria.getCategorias(db)();
}

module.exports = {
    getCategoria,
    getCategorias
}