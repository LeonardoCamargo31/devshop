const categoriaRouter = require('./categorias')

const init = (db) => {
    const express = require('express')
    const router = express.Router()

    //criamos um middleware, para verificar se usuario esta logado
    router.use((req, res, next) => {
        //caso na requisição tenha a sessão
        if (req.session.usuario) {
            //caso não encontre admin na sessão
            if (req.session.usuario.tipo_usuario.indexOf('admin') < 0) {
                res.redirect('/')
            }else{
                next()
            }
        }else{
            res.redirect('/')
        }
    })

    router.get('/',(req,res)=>{
        res.render('admin/index')
    })
    //router.use('/produto', produtoRouter(db))
    router.use('/categorias', categoriaRouter(db))

    return router
}

module.exports = init