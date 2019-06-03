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

const app = require('./app')(db)

//debug das queries executadas
//quero checar o evento query, temos um callback, que nos retorna a query
db.on('query', query => {
    //console.log('SQL',query)
})

const usuario = require('./models/usuario')
usuario.iniciaUsuario(db)()//passo db e executo

app.listen(port, (err) => {
    if (err) {
        console.log('Não foi possível iniciar o servidor')
    } else {
        console.log('Devshop server rodando na porta ' + port)
    }
})