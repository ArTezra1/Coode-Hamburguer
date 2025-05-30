import { ErroBadRequest } from "../error/ErrorClasses.js";

async function paginar(req, res, next) {
  try {
    let { limit = 10, page = 1, ordenation = "_id:-1" } = req.query

    let ordenationCamp = "_id"
    let order = -1

    if (typeof ordenation === "string") {
      const parts = ordenation.split(":")
      ordenationCamp = parts[0] || "_id"
      order = parseInt(parts[1])
      
      if (isNaN(order) || ![1, -1].includes(order)) {
        order = -1

      }
    }

    limit = parseInt(limit)
    page = parseInt(page)

    const maxLimit = 100
    if (limit > maxLimit) limit = maxLimit

    if (isNaN(limit) || isNaN(page) || limit <= 0 || page <= 0) {
      return next(new ErroBadRequest("Query inválida para paginação."))
    }

    const query = req.result

    const resultadoPaginado = await query
      .sort({ [ordenationCamp]: order })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec()

    return res.status(200).json({
      page,
      limit,
      ordenation: `${ordenationCamp}:${order}`,
      quantity: resultadoPaginado.length,
      result: resultadoPaginado,
    })

  } catch (error) {
    next(error)

  }
}

export default paginar
