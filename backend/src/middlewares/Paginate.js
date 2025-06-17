function paginate(req, res, next) {
  try {
    const { page = 1, limit = 10 } = req.query

    const pageNumber = parseInt(page)
    const limitNumber = parseInt(limit)

    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
      return res.status(400).json({
        message: 'Parâmetros de paginação invalidos.'
      })
    }

    const result = req.result

    const startIndex = (pageNumber - 1) * limitNumber
    const endIndex = startIndex + limitNumber

    const paginatedResult = result.slice(startIndex, endIndex)

    const pages = Math.ceil(result.length / limitNumber)

    res.status(200).json({
      page: pageNumber,
      limit: limitNumber,
      totalPages: pages,
      totalItems: result.length,
      items: paginatedResult
    })

  } catch (error) {
    next(error)
  }
}

export default paginate
