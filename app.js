//assim minha aplicação pode ser iniciada em qualquer lugar

const init = (db) => {
    const express = require('express')
    const app = express()

    const CategoriaController = require('./controllers/categorias')
    const routes = require('./routes')//como tem o index, não precisa ser ./routes/index

    app.set('view engine', 'ejs')
    app.use(express.static('public'))

    //Middleware => ele vai interceptar o fluxo, assim que feito, continua o fluxo
    //app.use((req,res,next)=>{ vai interceptar toda requisição
    //app.use('/',(req,res,next)=>{ então vai interceptar só a home 
    app.use(async (req, res, next) => {
        const categorias = await CategoriaController.getCategorias(db)
        //forma de enviar dados de um middleware, para frente da aplicação, pegando esse dado em outro ponto
        //como em outra requisição ou na view locals.categorias
        res.locals = {
            categorias
        }
        next()//para continuar o fluxo
    })

    app.use(routes(db))
    
    return app
}

module.exports = init