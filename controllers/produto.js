const init = (db) => {
    const Produto = require('../models/produto')(db)

    const getProduto = async (req, res) => {
        const produto = await Produto.getProdutoPorId(req.params.id)
        res.render('produto-detalhe', {
            produto
        })
    }

    return {
        getProduto
    }
}

module.exports = init