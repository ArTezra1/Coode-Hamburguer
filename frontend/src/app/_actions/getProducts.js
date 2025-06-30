import axios from "axios"

async function getProducts(category, page = 1, limit = 10) {
  try {
    if(category){
        const response = await axios.get(`http://localhost:5000/v1/products?category=${category}&page=${page}&limit=${limit}`)
        return response.data
    }

    const response = await axios.get("http://localhost:5000/products")
    return response.data

  } catch (error) {
    console.error("Erro ao buscar produtos:", error)
    throw error
  }
}

export {
    getProducts
}