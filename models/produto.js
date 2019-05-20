const slug = require('../utils/slug')

const getProdutosPorIdCategoria = (db) => async (id) => {
    const produtos = await db.select('*')
        .from('produtos AS p')
        .innerJoin('categorias_produtos AS cp', 'cp.produto_id', 'p.id')
        .where('cp.categoria_id', id)

    const produtosComSlug = produtos.map(produto=>{
        return novoProduto ={...produto,slug: slug(produto.nome)}
    })
    return produtosComSlug
}

const getProdutoPorId = (db) => async (id) => {
    const produto = await db.select('*')
        .from('produtos')
        .where('id', id)
    
    return produto[0]
}

module.exports = {
    getProdutosPorIdCategoria,
    getProdutoPorId
}