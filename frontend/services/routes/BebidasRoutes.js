import api from "../API.js";

async function getBebidas() {
    try {
        const response = await api.get("/bebidas")
        return response.data
    } catch (error) {
        console.error(error)
        throw error        
    }
}

async function getBebidasById(bebidaId) {
    try {
        const response = await api.get(`/bebidas/${bebidaId}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error        
    }
}

async function getBebibasByFilter(filter) {
    try {
        const response = await api.get(`/bebidas/query?${filter}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function postBebidas(bebida) {
    try {
        const response = await api.post("/bebidas", bebida)
        return response.data
    } catch (error) {
        console.error(error)  
        throw error      
    }
}

async function putBebidas(bebidaId, bebidaNova) {
    try {
        const response = await api.put(`/bebidas/${bebidaId}`, bebidaNova)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function deleteBebidas(bebidaId) {
    try {
        const response = await api.delete(`/bebidas/${bebidaId}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error(error)        
    }
}

export { getBebidas, getBebidasById, getBebibasByFilter, postBebidas, putBebidas, deleteBebidas}