class MensagemErro extends Error{
    constructor(message = "Erro no servidor.", status = 500){
        super()
        this.message = message,
        this.status = status
    }
    enviarResposta(res){
        res.status(this.status).send({
            message: this.message,
            status: this.status
        })
    }
}

class ErroNotFound extends MensagemErro{
    constructor(message = "Não encontrado."){
        super(message, 404)
    }
}

class ErroBadRequest extends MensagemErro{
    constructor(message = "Erro na requisição, um ou mais dados fornecidos estão incorretos."){
        super(message, 400)
    }
}

class ErroUnauthorized extends MensagemErro{
    constructor(message = "Acesso não autorizado."){
        super(message, 403)
    }
}

class ErroValidation extends MensagemErro{
    constructor(erro){
        const mensagemErro = Object.values(erro.errors)
        .map(erro => erro.message)
        .join("; ")
        super(`Os seguintes erros foram encontrados: ${mensagemErro}`, 422)
    }
}

export { MensagemErro, ErroNotFound, ErroUnauthorized, ErroBadRequest, ErroValidation }