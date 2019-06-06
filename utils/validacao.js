const joi = require('@hapi/joi')

const extrairErros = erro => {
    //para reduzir meus erros em um unico erro
    const erros = erro.details.reduce((prev, curr) => {
        if (prev[curr.path[0]]) {//se existir esse cara
            prev[curr.path[0]].push(curr.type)
        }
        else {
            prev[curr.path[0]] = [curr.type]
        }
        return prev
    }, {})

    return {
        erros,
        campos: Object.keys(erros)//nome dos campos
    }
}

const validacaoErro = (mensagem, erros) => ({
    mensagem,
    erros
})

const valida = (objeto, schema) => {
    //value já vem tudo tratado, como remover elementos desconhecidos
    const { error, value } = joi.validate(objeto, schema, {
        abortEarly: false,//abortEarly para validar em ordem, queremos retorne todos os erros de uma vez
        stripUnknown: true//remove elementos desconhecidos do schema
    })
    if (error) {
        throw validacaoErro('validação', extrairErros(error))
    } else {
        return value
    }
}

module.exports = {
    valida
}