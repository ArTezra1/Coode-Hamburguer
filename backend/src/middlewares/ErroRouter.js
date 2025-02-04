import mongoose from "mongoose"
import { ErroBadRequest, MensagemErro } from "../error/ClasseDeErro.js"
import { ErroNotFound } from "../error/ClasseDeErro.js"
import { ErroUnauthorized } from "../error/ClasseDeErro.js"
import { ErroValidation } from "../error/ClasseDeErro.js"

function ManipuladorDeErros(erro, req, res, next){
    if(erro instanceof mongoose.Error.CastError){
        new ErroBadRequest().enviarResposta(res)

    } else if (erro instanceof mongoose.Error.ValidationError){
        new ErroValidation().enviarResposta(res)

    } else if(erro instanceof ErroNotFound){
        erro.enviarResposta(res)
        
    } else{
        new MensagemErro().enviarResposta(res)
    }
}

export default ManipuladorDeErros