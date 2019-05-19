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

app.get('/', async (req, res) => {
    //passo o db, e depois chamo a função
    const categorias = await Categoria.getCategorias(db)();
    res.render('home', {
        categorias
    })
})

app.get('/categoria/:id/:slug', async (req, res) => {
    const categorias = await Categoria.getCategorias(db)();
    const produtos = await Produto.getProdutosPorIdCategoria(db)(req.params.id)
    const categoria = await Categoria.getCategoriaPorId(db)(req.params.id)
    res.render('category', {
        categoria,
        categorias,
        produtos
    })
})

app.listen(port, (err) => {
    if (err) {
        console.log('Não foi possível iniciar o servidor')
    } else {
        console.log('Devshop server rodando na porta ' + port)
    }
})