const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const slug = require('./utils/slug')

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
    console.log(query)
})


app.set('view engine', 'ejs')
app.use(express.static('public'))

const getCategorias = async () =>{
    const categorias = await db('categorias').select('*')
    const categoriasComSlug = categorias.map(categoria => {
        const novaCategoria = { ...categoria, slug: slug(categoria.categoria) }
        return novaCategoria
    })
    return categoriasComSlug
}

app.get('/', async (req, res) => {
    const categorias = await getCategorias();

    res.render('home', {
        categorias
    })
})


app.get('/categoria/:id/:slug', async (req, res) => {
    const categorias = await getCategorias();

    const produtos = await db.select('*')
        .from('produtos AS p')
        .innerJoin('categorias_produtos AS cp', 'cp.produto_id', 'p.id')
        .where('cp.categoria_id', req.params.id)

    const categoria = await db.select('*').from('categorias').where('id',req.params.id)
    console.log(categoria)
    
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