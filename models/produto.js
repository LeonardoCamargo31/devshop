const init = (db) => {
    const slug = require('../utils/slug')

    const getPaginationParams = query => {
        const { currentPage, pages, pageSize } = query
        return {
            currentPage: currentPage ? parseInt(currentPage) : 0,
            pages: pages ? parseInt(pages) : 1,
            pageSize: pageSize ? parseInt(pageSize) : 1
        }
    }

    const getProdutosPorIdCategoria = async (id, query) => {
        const pagination = getPaginationParams(query)
        const produtos = await db.select('*')
            .from('produtos AS p')
            .innerJoin('categorias_produtos AS cp', 'cp.produto_id', 'p.id')
            .where('cp.categoria_id', id)
            .offset(pagination.currentPage * pagination.pageSize)//inicio da pagina
            .limit(pagination.pageSize)//limite da pagina

        const produtosCount = await db.count('* as total')
            .from('produtos AS p')
            .innerJoin('categorias_produtos AS cp', 'cp.produto_id', 'p.id')
            .where('cp.categoria_id', id)
            .first()//trazer só o primeiro registro

        
        const produtosComSlug = produtos.map(produto => {
            return novoProduto = { ...produto, slug: slug(produto.nome) }
        })

        pagination.total = produtosCount.total
        pagination.totalPages = Math.ceil(produtosCount.total / pagination.pageSize)
        console.log(pagination.total)
        return {
            data: produtosComSlug,
            pagination
        }
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