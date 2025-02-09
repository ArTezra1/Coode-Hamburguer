import clsx from 'clsx'
import React, { useState } from 'react'

const NavBar = () => {

  let [selected, setSelected] = useState("")

  function handleClick(item){
    setSelected(item)
    console.log(selected)
  }

  return (
    <nav className='lg:hidden mt-4 bg-zinc-900 py-2 px-4 rounded-3xl flex gap-4 sticky items-center justify-center w-[75%] md:w-[50%]'>
        <div
        className={clsx(selected == "lanches" ? "bg-zinc-800 py-1 px-4 rounded-xl" : "hover:bg-zinc-800 hover:py-1 hover:px-4 rounded-xl cursor-pointer transition-all duration-300")}
        onClick={() => handleClick("lanches")}
        >
          <a href="#lanches" id='lanches'>
            Lanches
          </a>
        </div>

        <div
        className={clsx(selected == "combos" ? "bg-zinc-800 py-1 px-4 rounded-xl" : "hover:bg-zinc-800 hover:py-1 hover:px-4 rounded-xl cursor-pointer transition-all duration-300")}
        onClick={() => handleClick("combos")}
        >
          <a href="#combos" id='combos'>
            Combos
          </a>
        </div>

        <div
        className={clsx(selected == "bebidas" ? "bg-zinc-800 py-1 px-4 rounded-xl" : "hover:bg-zinc-800 hover:py-1 hover:px-4 rounded-xl cursor-pointer transition-all duration-300")}
        onClick={() => handleClick("bebidas")}
        >
          <a href="#">
            Bebidas
          </a>
        </div>

        <div
        className={clsx(selected == "cervejas" ? "bg-zinc-800 py-1 px-4 rounded-xl" : "hover:bg-zinc-800 hover:py-1 hover:px-4 rounded-xl cursor-pointer transition-all duration-300")}
        onClick={() => handleClick("cervejas")}
        >
          <a href="#">
            cervejas
          </a>
        </div>
    </nav>
  )
}

export default NavBar
