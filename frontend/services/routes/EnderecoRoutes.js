import api from "../API.js";

async function getEndereco() {
    try {
        const response = await api.get("/enderecos")
        return response.data
    } catch (error) {
        console.error(error)
        throw error        
    }
}

async function getEnderecoById(enderecoId) {
    try {
        const response = await api.get(`/enderecos/${enderecoId}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function getEnderecoByFilter(filter) {
    try {
        const response = await api.get(`/enderecos/query?${filter}`)        
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function postEndereco(endereco) {
    try {
        const response = await api.post("/enderecos", endereco)
        return response.data        
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function putEndereco(enderecoId, enderecoNovo) {
    try {
        const response = await api.put(`/enderecos/${enderecoId}`, enderecoNovo)
        return response.data        
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function deleteEndereco(enderecoId) {
    try {
        const response = await api.delete(`/enderecos/${enderecoId}`)
        return response.data        
    } catch (error) {
        console.error(error)
        throw error
    }
}

export { getEndereco, getEnderecoById, getEnderecoByFilter, postEndereco, putEndereco, deleteEndereco }