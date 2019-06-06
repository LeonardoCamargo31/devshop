const init = (db) => {

    const slug = require('../utils/slug')

    const getProdutosPorIdCategoria = async (id) => {
        const produtos = await db.select('*')
            .from('produtos AS p')
            .innerJoin('categorias_produtos AS cp', 'cp.produto_id', 'p.id')
            .where('cp.categoria_id', id)

        const produtosComSlug = produtos.map(produto => {
            return novoProduto = { ...produto, slug: slug(produto.nome) }
        })
        return produtosComSlug
    }

    const getProdutoPorId = async (id) => {
        const produto = await db.select('*')
            .from('produtos')
            .where('id', id)

        return produto[0]
    }

    return {
        getProdutosPorIdCategoria,
        getProdutoPorId
    }
}

module.exports = init