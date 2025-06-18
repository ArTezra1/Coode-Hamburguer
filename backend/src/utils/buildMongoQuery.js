export default function buildMongoQuery(filters = {}, options = {}) {
    const regexFields = options.regexFields || ["name", "description", "price"]
    const excludeFields = ["page", "limit", "sortBy", "order"]

    const mongoQuery = {}

    for (const key in filters) {
        if (excludeFields.includes(key)) continue

        const value = filters[key]

        if (key === "price" && typeof value === "string" && value.includes("-")) {
            const [min, max] = value.split("-").map(Number)
            mongoQuery[key] = { $gte: min, $lte: max }

        } else if (regexFields.includes(key)) {
            mongoQuery[key] = { $regex: value, $options: "i" }

        } else if (!isNaN(value)) {
            mongoQuery[key] = Number(value)

        } else {
            mongoQuery[key] = value
        }
    }

    const sort = {}
    const sortBy = filters.sortBy || "createdAt"
    const order = filters.order === "asc" ? 1 : -1
    sort[sortBy] = order

    return { filter: mongoQuery, sort }
}
