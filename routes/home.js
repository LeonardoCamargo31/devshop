
const init = (db)=>{
    const express =require('express')
    const router = express.Router()
    const homeController = require('../controllers/home')

    router.get('/', homeController.getIndex)

    return router
}

module.exports = init