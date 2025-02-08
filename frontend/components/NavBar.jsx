import clsx from 'clsx'
import React, { useState } from 'react'

const NavBar = () => {

  const [selected, setSelected] = useState("")

  function handleHover(item){
    setSelected = item
  }

  return (
    <nav className='lg:hidden mt-4 bg-zinc-900 py-2 px-4 rounded-3xl flex gap-4 sticky'>
        <a href="" 
        id='lanches' 
        className={
          clsx(selected == "lanche" ? "text-blue-500" : "text-red-500")
          }
          onClick={()=>handleHover("lanche")}
          >
          Lanches
        </a>
        <a href="" 
        id='combos'
        className={
          clsx(selected == "combos" ? "text-blue-500" : "text-red-500")
          }
          onClick={()=>handleHover("combos")}
        >
          Combos
        </a>
        <a href="" id='bebidas'>
          Bebidas
        </a>
        <a href="" id='alcool'>
          Bebidas Alcoolicas
        </a>
    </nav>
  )
}

export default NavBar