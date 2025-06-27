class ErrorMessage extends Error {
    constructor(message = "Erro no servidor.", status = 500) {
        super()
        this.message = message,
            this.status = status
    }

    enviarResposta(res) {
        res.status(this.status).send({
            message: this.message,
            status: this.status
        })
    }
}

class ErroNotFound extends ErrorMessage {
    constructor(message = "Não encontrado.") {
        super(message, 404)
    }
}

class ErroBadRequest extends ErrorMessage {
    constructor(message = "Erro na requisição, um ou mais dados fornecidos estão incorretos.") {
        super(message, 400)
    }
}

class ErroUnauthorized extends ErrorMessage {
    constructor(message = "Acesso não autorizado.") {
        super(message, 403)
    }
}

class ErroValidation extends ErrorMessage {
    constructor(erro) {
        const mensagemErro = Object
            .values(erro?.errors || {})
            .map(erro => erro.message)
            .join("; ")

        super(`Os seguintes erros foram encontrados: ${mensagemErro}`, 422)
    }
}


class ErroObjectParameter extends ErrorMessage {
    constructor(message = "Erro na passagem de parâmetros inválidos na consulta.") {
        super(message, 400)
    }
}

class ErroAuthentication extends ErrorMessage {
    constructor(message = "Autenticação necessária.") {
        super(message, 401)
    }
}

class ErroConflict extends ErrorMessage {
    constructor(message = "Conflito de dados, o recurso já existe.") {
        super(message, 409)
    }
}

class ErroTimeout extends ErrorMessage {
    constructor(message = "Tempo de requisição excedido.") {
        super(message, 408)
    }
}

export {
    ErrorMessage,
    ErroNotFound,
    ErroUnauthorized,
    ErroBadRequest,
    ErroValidation,
    ErroAuthentication,
    ErroConflict,
    ErroTimeout,
    ErroObjectParameter
}