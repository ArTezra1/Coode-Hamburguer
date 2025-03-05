import api from "../API.js";

async function getCombo() {
    try {
        const response = await api.get("/combos")
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function getComboById(comboId) {
    try {
        const response = await api.get(`/combos/${comboId}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function getComboByFilter(filter) {
    try {
        const response = await api.get(`/combos/query?${filter}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function postCombo(combo) {
    try {
        const response = await api.post("/combos", combo)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function putCombo(comboId, comboNovo) {
    try {
        const response = await api.put(`/combos/${comboId}`, comboNovo)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function deleteCombo(comboId) {
    try {
        const response = await api.delete(`/combos/${comboId}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export { getCombo, getComboById, getComboByFilter, postCombo, putCombo, deleteCombo }