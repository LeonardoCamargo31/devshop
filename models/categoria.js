const slug = require('../utils/slug')

//passo db por parametro
const getCategorias = (db) => async () => {
    const categorias = await db('categorias').select('*')
    const categoriasComSlug = categorias.map(categoria => {
        const novaCategoria = { ...categoria, slug: slug(categoria.categoria) }
        return novaCategoria
    })
    return categoriasComSlug
}

const getCategoriaPorId = (db) => async (id) => {
    return await db.select('*').from('categorias').where('id', id)
}

module.exports = {
    getCategorias,
    getCategoriaPorId
}