const getProdutosPorIdCategoria = (db) => async (id) => {
    const produtos = await db.select('*')
        .from('produtos AS p')
        .innerJoin('categorias_produtos AS cp', 'cp.produto_id', 'p.id')
        .where('cp.categoria_id', id)
    return produtos
}

module.exports = {
    getProdutosPorIdCategoria
}