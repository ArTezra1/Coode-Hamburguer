import { ErroBadRequest } from "../error/ErrorClasses.js";

function validateCategories(category) {
    const validCategories = ["burger", "drink", "portion", "combo", "other"]
    if (!category || !validCategories.includes(category)) {
        throw new ErroBadRequest("Categoria inválida")
    }
}

function validateRequiredFields(data) {
    switch (data.category) {
        case "burger":
            if (!data.ingredients) {
                throw new ErroBadRequest("Lanches precisam de ingredientes.")
            }
            break

        case "combo":
            if (!data.itensCombo || !Array.isArray(data.itensCombo) || data.itensCombo.length < 2) {
                throw new ErroBadRequest("Combos precisam de pelo menos 2 itens.")
            }
            break

        case "drink":
            if(!data.brand){
                throw new ErroBadRequest("Bebidas precisam de uma marca.")
            }
            break

        case "portion":
        case "other":

            break

        default:
            throw new ErroBadRequest(`Categoria inválida: ${data.category}`)
    }
}

function validateImage(file) {
    if (!file || !file.filename) {
        throw new ErroBadRequest("Imagem é obrigatória")
    }
}

function validateName(name) {
    if (!name || typeof name !== "string" || name.trim().length < 3) {
        throw new ErroBadRequest("Nome é obrigatório e deve ter pelo menos 3 caracteres.")
    }
}

function validatePrice(price) {
    if (price <= 0) {
        throw new ErroBadRequest("Preço é obrigatório e deve ser maior que zero.")
    }
}

function validateQuantity(quantity) {
    if (quantity < 0) {
        throw new ErroBadRequest("Quantidade é obrigatória e deve ser maior ou igual a zero.")
    }
}

function validateProduct(data, file) {
    validateCategories(data.category)
    validateRequiredFields(data)
    validateImage(file)
    validateName(data.name)
    validatePrice(data.price)
    validateQuantity(data.quantity)
}

export default validateProduct
