const init = (db) => {
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
    const getCategorias = async () => {
        const categorias = await db('categorias').select('*')
        const categoriasComSlug = categorias.map(categoria => {
            const novaCategoria = { ...categoria, slug: slug(categoria.categoria) }
            return novaCategoria
        })
        return categoriasComSlug
    }

    const getCategoriaPorId = async (id) => {
        return await db.select('*').from('categorias').where('id', id)
    }


    const criarCategoria = async (categoria) => {
        const value = validacao.valida(categoria, criarSchema)
        await db('categorias').insert(value)
        return true
    }

    const editarCategoria = async (id, categoria) => {
        const value = validacao.valida(categoria, criarSchema)
        await db('categorias').where({ id }).update(value)
        return true
    }

    const removerCategoria = async (id) => {
        await db('categorias').where({ id }).del()
    }

    return {
        getCategorias,
        getCategoriaPorId,
        criarCategoria,
        removerCategoria,
        editarCategoria
    }
}

module.exports = init