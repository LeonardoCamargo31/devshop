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

const Categoria = require('./models/categoria')
const Produto = require('./models/produto')

//Middleware => ele vai interceptar o fluxo, assim que feito, continua o fluxo
//app.use((req,res,next)=>{ vai interceptar toda requisição
//app.use('/',(req,res,next)=>{ então vai interceptar só a home 
app.use(async (req,res,next)=>{
    const categorias = await Categoria.getCategorias(db)();
    //forma de enviar dados de um middleware, para frente da aplicação, pegando esse dado em outro ponto
    //como em outra requisição ou na view locals.categorias
    res.locals ={
        categorias
    }
    next()//para continuar o fluxo
})

app.get('/', async (req, res) => {
    
    res.render('home')
})

app.get('/categoria/:id/:slug', async (req, res) => {
    //passo o db, e depois chamo a função
    const produtos = await Produto.getProdutosPorIdCategoria(db)(req.params.id)
    const categoria = await Categoria.getCategoriaPorId(db)(req.params.id)
    res.render('categoria', {
        categoria,
        produtos
    })
})

app.get('/produto/:id/:slug', async (req, res) => {
    const produto = await Produto.getProdutoPorId(db)(req.params.id)
    res.render('produto-detalhe', {
        produto
    })
})

app.listen(port, (err) => {
    if (err) {
        console.log('Não foi possível iniciar o servidor')
    } else {
        console.log('Devshop server rodando na porta ' + port)
    }
})