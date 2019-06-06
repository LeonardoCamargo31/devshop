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


const adminCriarCategoria = (db) => async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { categoria, descricao } = req.body
            await Categoria.criarCategoria(db)({ categoria, descricao })
            res.redirect('/admin/categorias')
        } catch (err) {
            res.render('admin/categorias/nova', {
                formulario: req.body,
                erros: err.erros.campos
            })
        }
    } else {
        res.render('admin/categorias/nova', {
            formulario: {},
            erros: []
        })
    }
}

const adminGetCategorias = (db) => async (req, res) => {
    const categoria = await Categoria.getCategorias(db)()
    res.render('admin/categorias/index', {
        categoria
    })
}

const adminRemoverCategoria = (db) => async (req, res) => {
    await Categoria.removerCategoria(db)(req.params.id)
    res.redirect('/admin/categorias')
}

const adminEditarCategoria = (db) => async (req, res) => {
    if (req.method === 'POST') {
        try {
            await Categoria.editarCategoria(db)(req.params.id, req.body)
            res.redirect('/admin/categorias')
        } catch (err) {
            res.render('admin/categorias/editar', {
                formulario: req.body,
                erros: err.erros.campos
            })
        }
    } else {
        const categoria = await Categoria.getCategoriaPorId(db)(req.params.id)
        res.render('admin/categorias/editar', {
            formulario: categoria[0],
            erros: []
        })
    }
}

module.exports = {
    getCategoria,
    getCategorias,
    adminGetCategorias,
    adminCriarCategoria,
    adminRemoverCategoria,
    adminEditarCategoria
}