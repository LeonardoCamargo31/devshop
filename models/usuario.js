const bcrypt = require('bcryptjs')

const gerarHash = (senha) => {
    const salt = bcrypt.genSaltSync(10)//10 iterações
    const hash = bcrypt.hashSync(senha, salt)
    return hash
}

const iniciaUsuario = (db) => async () => {
    const count = await db.count('id as total').from('usuarios')
    if (count[0].total == 0) {
        //siginifica que não tem nenhum usuario, precisamos de um inicial
        const usuario = {
            nome: 'Admin',
            email: 'admin@devshop.com.br',
            senha: gerarHash('minhasenha123!'),
            email_checado: true,
            criado: new Date(),
            alterado: new Date(),
            tipo_usuario:'admin,financeiro,cliente'
        }
        await db('usuarios').insert(usuario)
    }
}

module.exports = {
    iniciaUsuario
}