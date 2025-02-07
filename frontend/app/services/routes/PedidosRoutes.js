import api from "../API.js";

async function getPedido(params) {
    try {
        const response = await api.get("/pedidos")
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function getPedidoById(pedidoId) {
    try {
        const response = await api.get(`/pedidos/${pedidoId}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function getPedidoByFilter(filter) {
    try {
        const response = await api.get(`/pedidos/query?${filter}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function postPedido(pedido) {
    try {
        const response = await api.post("/pedidos", pedido)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function putPedido(pedidoId, pedidoNovo) {
    try {
        const response = await api.put(`/pedidos/${pedidoId}`, pedidoNovo)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function deletePedido(pedidoId) {
    try {
        const response = await api.delete(`/pedidos/${pedidoId}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export { getPedido, getPedidoById, getPedidoByFilter, postPedido, putPedido, deletePedido }