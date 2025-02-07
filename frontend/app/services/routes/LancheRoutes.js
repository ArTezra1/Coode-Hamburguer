import api from "../API.js";

async function getLanche(params) {
    try {
        const response = await api.get("/lanches")
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function getLancheById(lancheId) {
    try {
        const response = await api.get(`/lanches/${lancheId}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function getLancheByFilter(filter) {
    try {
        const response = await api.get(`/lanches/query?${filter}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function postLanche(lanche) {
    try {
        const response = await api.post("/lanches", lanche)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function putLanche(lancheId, lancheNovo) {
    try {
        const response = await api.put(`/lanches/${lancheId}`, lancheNovo)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function deleteLanche(lancheId) {
    try {
        const response = await api.delete(`/lanches/${lancheId}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export { getLanche, getLancheById, getLancheByFilter, postLanche, putLanche, deleteLanche }