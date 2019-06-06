//assim minha aplicação pode ser iniciada em qualquer lugar

const init = (db) => {
    const express = require('express')
    const bodyParser = require('body-parser')
    const session = require('express-session')
    const app = express()

    const CategoriaController = require('./controllers/categorias')(db)
    const routes = require('./routes')//como tem o index, não precisa ser ./routes/index

    app.set('view engine', 'ejs')
    app.use(express.static('public'))

    //body parser
    app.use(bodyParser.urlencoded({ extended: true }))

    //session
    app.use(session({
        secret: 'DevShop',
        name: 'sessionId'
    }))

    //Middleware => ele vai interceptar o fluxo, assim que feito, continua o fluxo
    //app.use((req,res,next)=>{ vai interceptar toda requisição
    //app.use('/',(req,res,next)=>{ então vai interceptar só a home 
    app.use(async (req, res, next) => {
        const categorias = await CategoriaController.getCategorias()
        //forma de enviar dados de um middleware, para frente da aplicação, pegando esse dado em outro ponto
        //como em outra requisição ou na view locals.categorias

        const { usuario } = req.session//req.session.usuario
        res.locals = {
            categorias,
            usuario
        }
        next()//para continuar o fluxo
    })

    app.use(routes(db))

    return app
}

module.exports = init