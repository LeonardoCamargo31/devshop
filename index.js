const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const knex = require('knex')
const db = knex({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        password: '',
        user: 'root',
        port: '3307',
        database: 'devshop'
    }
})

//debug das queries executadas
//quero checar o evento query, temos um callback, que nos retorna a query
db.on('query', query => {
    //console.log(query)
})

app.set('view engine', 'ejs')
app.use(express.static('public'))

const homeController = require('./controllers/home')
const CategoriaController = require('./controllers/categorias')
const ProdutoController = require('./controllers/produto')

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

app.get('/', homeController.getIndex)

//injetando o db
app.get('/categoria/:id/:slug', CategoriaController.getCategoria(db))

app.get('/produto/:id/:slug', ProdutoController.getProduto(db))

app.listen(port, (err) => {
    if (err) {
        console.log('Não foi possível iniciar o servidor')
    } else {
        console.log('Devshop server rodando na porta ' + port)
    }
})