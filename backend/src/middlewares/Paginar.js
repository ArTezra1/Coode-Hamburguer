import { ErroBadRequest } from "../error/ErrorClasses.js"

async function paginar(req, res, next) {
    try {
        let { limite = 10, pagina = 1, ordenacao = "_id:-1" } = req.query

        let [campoOrdenacao, ordem] = ordenacao.split(":")

        limite = parseInt(limite)
        pagina = parseInt(pagina)
        ordem = parseInt(ordem)

        const query = req.result

        if (limite > 0 && pagina > 0) {
            const resultadoPaginado = await query
                .sort({ [campoOrdenacao]: ordem })
                .skip((pagina - 1) * limite)
                .limit(limite)
                .exec()

            return res.status(200).json(resultadoPaginado)
        } else {
            next(new ErroBadRequest("Parâmetros de paginação inválidos."))
        }

    } catch (error) {
        next(error)
    }
}

export default paginar
