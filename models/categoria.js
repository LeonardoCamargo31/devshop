const slug = require('../utils/slug')
const joi = require('@hapi/joi')
const validacao = require('../utils/validacao')

//definir o formato de objeto que eu quero
//vamos checar se o objeto recebido bater com esse formato requerido
const criarSchema = joi.object().keys({
    categoria: joi.string().min(5).max(245).required(),
    descricao: joi.string().min(5).required()
})

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


const criarCategoria = (db) => async (categoria) => {
    const value = validacao.valida(categoria, criarSchema)
    await db('categorias').insert(value)
    return true
}

module.exports = {
    getCategorias,
    getCategoriaPorId,
    criarCategoria
}