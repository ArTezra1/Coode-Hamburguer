"use client"

import { CircleUserRound, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import Carrinho from './Carrinho'
import Link from 'next/link'

const Header = () => {
  const [items, setItems] = useState(0)

  const [isOpenCart, setOpenCart] = useState(false)

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
            <Link
            href="/auth/login"
            >
            <CircleUserRound className='w-10 h-10 text-zinc-300 hover:text-zinc-100 transition-colors'></CircleUserRound>
            </Link>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center gap-4 w-[75%] xs:mt-10'>
        <h1 className='font-semibold text-xl text-center'>
          Bem-vindo a nossa Hamburgueria!
        </h1>
        <p className='text-zinc-400 text-sm text-center leading-4'>
        Bem-vindo à nossa hamburgueria, temos não apenas hamburguers mas também pastéis, batatas, bebidas e <strong className="text-zinc-300">mais</strong>. Estamos prontos para servir você, aproveite!
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