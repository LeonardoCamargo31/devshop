const Produto = require('../models/produto')

const getProduto = (db) => async (req, res) => {
    const produto = await Produto.getProdutoPorId(db)(req.params.id)
    res.render('produto-detalhe', {
        produto
    })
}

module.exports = {
    getProduto
}