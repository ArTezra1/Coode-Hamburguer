import { useState, useEffect } from "react";

function useCarrinho() {
  const [itens, setItens] = useState([])
  function adicionarItem(item) {
    setItens((prevItens) => [...prevItens, item])
  }

  function removerItem(item) {
    setItens((prevItens) => prevItens.filter(i => i._id !== item._id))
  }

  function removerTodosItens() {
    setItens([])
  }

  function calcularTotal() {
    const total = itens.reduce((acc, item) => acc + item.preco_unitario, 0)
    console.log(total)
    return total
  }
  
  useEffect(() => {
    console.log("Carrinho atualizado:", itens)
  }, [itens])

  return {
    itens,
    adicionarItem,
    removerItem,
    removerTodosItens,
    calcularTotal,
  }
}

export default useCarrinho;
