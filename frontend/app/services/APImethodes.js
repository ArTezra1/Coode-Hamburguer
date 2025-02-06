import axios from "axios";

async function getFunction() {
    const response = await axios.get("http://localhost:5000/clientes")
    return response.data
}

export default getFunction