import mongoose from "mongoose"
import { ErroBadRequest, MensagemErro } from "../error/ClasseDeErro.js"
import { ErroNotFound } from "../error/ClasseDeErro.js"
import { ErroValidation } from "../error/ClasseDeErro.js"

function ManipuladorDeErros(erro, req, res, next){
    // console.error(erro)
    if(erro instanceof mongoose.Error.CastError){
        return new ErroBadRequest().enviarResposta(res)

    } else if (erro instanceof mongoose.Error.ValidationError){
        return new ErroValidation().enviarResposta(res)

    } else if(erro instanceof ErroNotFound){
        return erro.enviarResposta(res)
        
    } else{
        return new MensagemErro().enviarResposta(res)
    }
}

export default ManipuladorDeErros