import mongoose from "mongoose"
import {
  ErrorMessage,
  ErroBadRequest,
  ErroNotFound,
  ErroValidation,
  ErroUnauthorized,
  ErroAuthentication,
  ErroConflict,
  ErroTimeout,
  ErroObjectParameter
} from "../error/ErrorClasses.js"

function ErrorRouter(erro, req, res, next){
  if (erro instanceof mongoose.Error.CastError) {
    return new ErroBadRequest("ID inválido.").enviarResposta(res)

  } else if (erro instanceof mongoose.Error.ValidationError) {
    return new ErroValidation(erro).enviarResposta(res)

  } else if (erro instanceof mongoose.Error.ObjectParameterError) {
    return new ErroObjectParameter(erro).enviarResposta(res)

  } else if (
    erro instanceof ErroBadRequest ||
    erro instanceof ErroNotFound ||
    erro instanceof ErroUnauthorized ||
    erro instanceof ErroAuthentication ||
    erro instanceof ErroConflict ||
    erro instanceof ErroTimeout
  ) {
    return erro.enviarResposta(res)

  } else if (erro.name === "JsonWebTokenError") {
    return new ErroAuthentication("Token inválido.").enviarResposta(res)

  } else if (erro.name === "TokenExpiredError") {
    return new ErroAuthentication("Sessão expirada. Faça login novamente.").enviarResposta(res)

  }

  console.error("Erro não tratado:", erro)
  return new ErrorMessage().enviarResposta(res)
}

export default ErrorRouter