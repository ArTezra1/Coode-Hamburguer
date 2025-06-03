import { ErroBadRequest } from "../error/ErrorClasses.js";

async function paginar(req, res, next) {
  try {
    let { limit = "10", page = "1", ordenation = "_id:-1" } = req.query

    limit = parseInt(limit)
    page = parseInt(page)

    const maxLimit = 100
    if (isNaN(limit) || limit <= 0) limit = 10
    if (limit > maxLimit) limit = maxLimit
    if (isNaN(page) || page <= 0) page = 1

    let ordenationCamp = "_id"
    let order = -1

    if (typeof ordenation === "string") {
      const parts = ordenation.split(":")
      ordenationCamp = parts[0] || "_id"
      order = parts[1] === "1" ? 1 : -1
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
