const init = db => {
    const Categoria = require('../models/categoria')(db)
    const Produto = require('../models/produto')(db)

    //injetando o db
    const getCategoria = async (req, res) => {
        //passo o db, e depois chamo a função
        const produtos = await Produto.getProdutosPorIdCategoria(req.params.id,req.query)
        const categoria = await Categoria.getCategoriaPorId(req.params.id)
        res.render('categoria', {
            categoria,
            produtos
        })
    }

    const getCategorias = async () => {
        return await Categoria.getCategorias();
    }


    const adminCriarCategoria = async (req, res) => {
        if (req.method === 'POST') {
            try {
                const { categoria, descricao } = req.body
                await Categoria.criarCategoria({ categoria, descricao })
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

    const adminGetCategorias = async (req, res) => {
        const categoria = await Categoria.getCategorias()
        res.render('admin/categorias/index', {
            categoria
        })
    }

    const adminRemoverCategoria = async (req, res) => {
        await Categoria.removerCategoria(req.params.id)
        res.redirect('/admin/categorias')
    }

    const adminEditarCategoria = async (req, res) => {
        if (req.method === 'POST') {
            try {
                await Categoria.editarCategoria(req.params.id, req.body)
                res.redirect('/admin/categorias')
            } catch (err) {
                res.render('admin/categorias/editar', {
                    formulario: req.body,
                    erros: err.erros.campos
                })
            }
        } else {
            const categoria = await Categoria.getCategoriaPorId(req.params.id)
            res.render('admin/categorias/editar', {
                formulario: categoria[0],
                erros: []
            })
        }
    }
    return {
        //site
        getCategoria,
        getCategorias,
        //admin
        adminGetCategorias,
        adminCriarCategoria,
        adminRemoverCategoria,
        adminEditarCategoria
    }

}
module.exports = init