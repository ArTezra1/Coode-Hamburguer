async function filtrarPedido(params) {
    const busca = {}
    const { nome, tipo, sabor, precoMin, precoMax, marca, cep, bairro, rua, numero, role, email, telefone } = params

    if (cep) busca.cep = { $regex: cep, $options: "i" }
    if (bairro) busca.bairro = { $regex: bairro, $options: "i" }
    if (rua) busca.rua = { $regex: rua, $options: "i" }
    if (numero) busca.numero = Number(numero)

    if (nome) busca.nome = { $regex: nome, $options: "i" }
    if (tipo) busca.tipo = { $regex: tipo, $options: "i" }
    if (sabor) busca.sabor = { $regex: sabor, $options: "i" }
    if (marca) busca.marca = { $regex: marca, $options: "i" }

    if (precoMax || precoMin) busca.preco_unitario = {}

    if (precoMin) busca.preco_unitario.$gte = precoMin
    if (precoMax) busca.preco_unitario.$lte = precoMax

    if (role) busca.role = { $regex: role, $options: "i" }
    if (email) busca.email = { $regex: email, $options: "i" }
    if (telefone) busca.telefone = { $regex: telefone, $options: "i" }

    return busca

}

export default filtrarPedido