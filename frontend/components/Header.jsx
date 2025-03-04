"use client"

import { CircleUserRound, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import Carrinho from './Carrinho'

const Header = () => {
  const [items, setItems] = useState(0)

  const [isOpenCart, setOpenCart] = useState(false)

  function renderItems() {
    setItems(+1)
  }

  function openCart() {
    setOpenCart(!isOpenCart)
  }

  return (
    <header className='bg-zinc-900 w-full h-[34vh] flex flex-col items-center rounded-b-lg lg:pt-4'>
      <div className='lg:hidden xs:block xs:py-3 xs:px-6 bg-zinc-800 w-full'>
        <div className='flex items-center justify-between'>
          <div className='relative cursor-pointer'>
            <ShoppingCart className='w-10 h-10 text-zinc-300 hover:text-zinc-100 transition-colors' onClick={openCart}></ShoppingCart>
            {
              items > 0 && (
                <div className='absolute w-5 h-5 bg-red-700 left-6 top-6 rounded-full text-center'>
                  <p className='flex items-center justify-center text-center'>
                    {items}
                  </p>
                </div>
              )
            }

          </div>
          <div className='cursor-pointer'>
            <CircleUserRound className='w-10 h-10 text-zinc-300 hover:text-zinc-100 transition-colors'></CircleUserRound>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center gap-4 w-[75%] xs:mt-10'>
        <h1 className='font-semibold text-xl text-center'>
          Bem-vindo a nossa Hamburgueria!
        </h1>
        <p className='text-zinc-400 text-sm text-center leading-4'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, soluta voluptatum blanditiis, illum iure ullam accusamus dolor odit laboriosam porro iusto, earum aut doloribus incidunt explicabo possimus quae aliquam exercitationem.
        </p>
      </div>
      {isOpenCart &&
        createPortal(
          <div className="fixed top-0 left-0 z-50">
            <Carrinho onClose={() => setOpenCart(false)} />
          </div>,
          document.body
        )}
    </header>
  )
}

export default Header