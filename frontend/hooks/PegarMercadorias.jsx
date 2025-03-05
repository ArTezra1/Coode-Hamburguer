import { useEffect, useState } from "react";

import { getMercadorias } from "../services/routes/ProdutosRouter";

const useProdutos = () => {
  const [produtos, setProdutos] = useState({
    lanches: [],
    bebidas: [],
    bebidasAlcool: [],
    combos: [],
  })

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const resposta = await getMercadorias()
        setProdutos(resposta)

      } catch (error) {
        console.error("Erro ao buscar produtos:", error)
      } 
    }

    fetchProdutos()

  }, [])

  return { produtos }
}

export default useProdutos
