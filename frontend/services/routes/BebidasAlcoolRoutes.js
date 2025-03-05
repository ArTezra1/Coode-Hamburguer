import api from "../API.js";

async function getBebidaAlcool() {
    try {
        const response = await api.get("/alcool")
        return response.data
    } catch (error) {
        console.error(error)
        throw error        
    }
}

async function getBebidaAlcoolById(bebidaId) {
    try {
        const response = await api.get(`/alcool/${bebidaId}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error        
    }
}

async function getBebibaAlcoolByFilter(filter) {
    try {
        const response = await api.get(`/alcool/query?${filter}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function postBebidaAlcool(bebida) {
    try {
        const response = await api.post("/alcool", bebida)
        return response.data
    } catch (error) {
        console.error(error)  
        throw error      
    }
}

async function putBebidaAlcool(bebidaId, bebidaNova) {
    try {
        const response = await api.put(`/alcool/${bebidaId}`, bebidaNova)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function deleteBebidaAlcool(bebidaId) {
    try {
        const response = await api.delete(`/alcool/${bebidaId}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error(error)        
    }
}

export { getBebidaAlcool, getBebidaAlcoolById, getBebibaAlcoolByFilter, postBebidaAlcool, putBebidaAlcool, deleteBebidaAlcool }