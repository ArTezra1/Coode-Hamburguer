"use client"

import clsx from 'clsx'
import React, { useState } from 'react'

const NavBar = () => {
  
  const [isSelected, setIsSelected] = useState("lanches")

  function handleSelected(target){
    setIsSelected(target)
  }


  return (
    <nav className='lg:hidden mt-4 bg-zinc-900 py-2 px-4 rounded-3xl flex gap-4 sticky items-center justify-center xs:w-[90%] w-[75%] md:w-[50%]'>
        <div
        className={clsx(isSelected == "lanches" ? "bg-zinc-800 py-1 px-4 rounded-xl" : "hover:bg-zinc-800 hover:py-1 hover:px-4 rounded-xl cursor-pointer transition-all duration-300")}
        onClick={() => handleSelected("lanches")}
        >
          <a href="#lanches" id='lanches'>
            Lanches
          </a>
        </div>

        <div
        className={clsx(isSelected == "combos" ? "bg-zinc-800 py-1 px-4 rounded-xl" : "hover:bg-zinc-800 hover:py-1 hover:px-4 rounded-xl cursor-pointer transition-all duration-300")}
        onClick={() => handleSelected("combos")}
        >
          <a href="#combos" id='combos'>
            Combos
          </a>
        </div>

        <div
        className={clsx(isSelected == "bebidas" ? "bg-zinc-800 py-1 px-4 rounded-xl" : "hover:bg-zinc-800 hover:py-1 hover:px-4 rounded-xl cursor-pointer transition-all duration-300")}
        onClick={() => handleSelected("bebidas")}
        >
          <a href="#bebidas">
            Bebidas
          </a>
        </div>

        <div
        className={clsx(isSelected == "cervejas" ? "bg-zinc-800 py-1 px-4 rounded-xl" : "hover:bg-zinc-800 hover:py-1 hover:px-4 rounded-xl cursor-pointer transition-all duration-300")}
        onClick={() => handleSelected("cervejas")}
        >
          <a href="#alcool">
            Doses
          </a>
        </div>
    </nav>
  )
}

export default NavBar
