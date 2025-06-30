import axios from "axios"

async function getProducts(category) {
  try {
    if(category){
        const response = await axios.get(`http://localhost:5000/products?category=${category}`)
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