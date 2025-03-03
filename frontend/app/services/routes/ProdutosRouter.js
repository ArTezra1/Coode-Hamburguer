import api from "../API.js";

async function getProdutos() {
    try {
        const response = await api.get("/produtos")
        return response.data
    } catch (error) {
        console.error(error)
        throw error        
    }
}

async function getMercadorias() {
    try {
        const response = await api.get("/mercadorias")
        return response.data
    } catch (error) {
        console.error(error)
        throw error        
    }
}

async function getProdutosById(bebidaId) {
    try {
        const response = await api.get(`/produtos/${bebidaId}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error        
    }
}

async function getProdutosByFilter(filter) {
    try {
        const response = await api.get(`/produtos/query?${filter}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function postProdutos(bebida) {
    try {
        const response = await api.post("/produtos", bebida)
        return response.data
    } catch (error) {
        console.error(error)  
        throw error      
    }
}

async function putProdutos(bebidaId, bebidaNova) {
    try {
        const response = await api.put(`/produtos/${bebidaId}`, bebidaNova)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function deleteProduto(bebidaId) {
    try {
        const response = await api.delete(`/produtos/${bebidaId}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error(error)        
    }
}

export { getProdutos, getMercadorias, getProdutosById, getProdutosByFilter, postProdutos, putProdutos, deleteProduto }