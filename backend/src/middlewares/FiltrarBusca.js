async function filtrarPedido(model, params) {
    const busca = {}

    if (model.modelName == "Clientes") {
        const { nome, role, email } = params

        if (nome) busca.nome = { $regex: nome, $options: "i" }
        if (role) busca.role = { $regex: role, $options: "i" }
        if (email) busca.email = { $regex: email, $options: "i" }

        return busca

    } else if (model.modelName == "Lanches") {
        const { nome, tipo, sabor, precoMin, precoMax } = params

        if (nome) busca.nome = { $regex: nome, $options: "i" }
        if (tipo) busca.tipo = { $regex: tipo, $options: "i" }
        if (sabor) busca.sabor = { $regex: sabor, $options: "i" }

        if (precoMax || precoMin) busca.preco_unitario = {}

        if (precoMin) busca.preco_unitario.$gte = precoMin
        if (precoMax) busca.preco_unitario.$lte = precoMax

        return busca
    } else if(model.modelName == "Bebidas"){
        const { marca, tipo, sabor, precoMin, precoMax } = params

    if(marca) busca.marca = { $regex: marca, $options: "i" }
    if(tipo) busca.tipo = { $regex: tipo, $options: "i" }
    if(sabor) busca.sabor = { $regex: sabor, $options: "i" }

    if(precoMax || precoMin) busca.preco_unitario = {}

    if(precoMin) busca.preco_unitario.$gte = precoMin
    if(precoMax) busca.preco_unitario.$lte = precoMax

    return busca
    } else if(model.modelName = "BebidasAlcool"){
        const { marca, tipo, precoMin, precoMax } = params

    const busca = {}

    if (marca) busca.marca = { $regex: marca, $options: "i" }
    if (tipo) busca.tipo = { $regex: tipo, $options: "i" }

    if (precoMax || precoMin) busca.preco_unitario = {}

    if (precoMin) busca.preco_unitario.$gte = precoMin
    if (precoMax) busca.preco_unitario.$lte = precoMax

    return busca
    } else if(model.modelName == "Combos"){
        const { nome, tipo, precoMin, precoMax } = params

        const busca = {}
    
        if(nome) busca.nome = { $regex: nome, $options: "i" }
        if(tipo) busca.tipo = { $regex: tipo, $options: "i" }
    
        if(precoMax || precoMin) busca.preco_unitario = {}
    
        if(precoMin) busca.preco_unitario.$gte = precoMin
        if(precoMax) busca.preco_unitario.$lte = precoMax
    
        return busca
    } else if(model.modelName == "Enderecos"){
        const { cep, bairro, rua, numero } = params

    const busca = {}

    if(cep) busca.cep = { $regex: cep, $options: "i" }
    if(bairro) busca.bairro = { $regex: bairro, $options: "i" }
    if(rua) busca.rua = { $regex: rua, $options: "i" }
    if(numero) busca.numero = { $regex: numero, $options: "i" }

    return busca
    }

}

export default filtrarPedido