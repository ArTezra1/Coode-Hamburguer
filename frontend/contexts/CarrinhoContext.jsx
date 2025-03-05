"use client"

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [itens, setItens] = useState([])

  const adicionarItem = (item) => {
    setItens((prevItens) => [...prevItens, item])
  }

  const removerItem = (item) => {
    setItens((prevItens) => prevItens.filter((i) => i._id !== item._id))
  }

  const removerTodosItens = () => {
    setItens([])
  }

  const calcularTotal = () => {
    const total = itens.reduce((acc, item) => acc + item.preco_unitario, 0)
    return total
  }

  useEffect(() => {
    console.log("Carrinho atualizado:", itens)
  }, [itens])

  return (
    <CartContext.Provider
      value={{ itens, adicionarItem, removerItem, removerTodosItens, calcularTotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCarrinho = () => {
  return useContext(CartContext)
}