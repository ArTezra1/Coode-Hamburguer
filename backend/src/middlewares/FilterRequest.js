async function filterRequest(params) {
    const busca = {}
    const {  } = params

    // if (nome) busca.nome = { $regex: nome, $options: "i" }
    // if (tipo) busca.tipo = { $regex: tipo, $options: "i" }
    // if (sabor) busca.sabor = { $regex: sabor, $options: "i" }
    // if (marca) busca.marca = { $regex: marca, $options: "i" }

    // if (precoMax || precoMin) busca.preco_unitario = {}

    // if (precoMin) busca.preco_unitario.$gte = precoMin
    // if (precoMax) busca.preco_unitario.$lte = precoMax

    return busca

}

export default filterRequest