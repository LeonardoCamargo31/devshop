const Usuario = require('../models/usuario')

const login = (db) => async (req, res) => {
    const email = req.body.email
    const senha = req.body.password

    try {
        const usuario = await Usuario.login(db)(email, senha)
        req.session.usuario = usuario
        res.redirect('/')
    } catch (err) {
        res.send('Error' + err)
    }
}

const logout = (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
}

module.exports = {
    login,
    logout
}