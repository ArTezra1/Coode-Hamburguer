import api from "../API.js"

async function getCliente() {
  try {
    const response = await api.get("/clientes")
    return response.data
  } catch (error) {
    console.error("Erro ao buscar clientes:", error)
    throw error
  }
}

async function getClienteById(clienteId) {
  try {
    const response = await api.get(`/clientes/${clienteId}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function getClienteByFilter(filter) {
  try {
    const response = await api.get(`/clientes/query?${filter}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function postCliente(cliente) {
  try {
    const response = await api.post("/clientes", cliente)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function updateCliente(clienteId, clienteNovo) {
  try {
    const response = await api.put(`/clientes/${clienteId}`, clienteNovo)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function deleteCliente(clienteId) {
  try {
    const response = await api.delete(`/clientes/${clienteId}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { getCliente, getClienteById, getClienteByFilter, postCliente, updateCliente, deleteCliente } 