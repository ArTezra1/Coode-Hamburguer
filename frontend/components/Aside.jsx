"use client"

import { Input } from '@/components/ui/input'
import React from 'react'
import { ScrollArea } from './ui/scroll-area'
import { CircleUserRound, ShoppingCartIcon } from 'lucide-react'
import { useState } from 'react'
import Carrinho from './Carrinho'
import { createPortal } from "react-dom";
import useCarrinho from '@/app/hooks/CarrinhoHook'

const Aside = () => {

  const { itens } = useCarrinho()

  const [isOpenCart, setOpenCart] = useState(false)

  function openCart() {
    setOpenCart(!isOpenCart)
  }


  return (
    <aside className='bg-zinc-950 md:w-[20vw] h-full flex flex-col items-center gap-2'>
      <div className='bg-zinc-900 w-full lg:h-[51vh] flex flex-col rounded-r-lg pt-4 justify-between overflow-hidden'>
        <div className='p-2 flex gap-2 items-center mb-4'>
          <CircleUserRound className='w-10 h-10 cursor-pointer'></CircleUserRound>
          <div>
            <h1 className='text-lg'>
              Perfil
            </h1>
            <p className='text-zinc-400 text-sm leading-3'>
              Descrição
            </p>
          </div>
        </div>
        <div className='bg-zinc-800 w-full h-full flex flex-col items-center' onClick={openCart}>
          <div className='w-full text-center bg-zinc-800 pb-2'>
            <h2 className='mt-2'>
              Carrinho
            </h2>
          </div>
          <ScrollArea className="h-80 w-full">
            <div className='flex flex-col items-center justify-center'>
              {
                itens.length > 0 && (
                  itens.map((item, index) => (
                    <div className='mt-4 w-[90%] bg-zinc-900 h-16 rounded-md flex gap-2 pr-2 lg:pl-2 xl:pl-0'
                      key={index}
                    >
                      <img src={item.img}
                        className='xl:w-[25%] lg:hidden xl:block h-full rounded-md '
                      />

                      <div className='flex flex-col xl:w-[50%] lg:w-[75%]'>
                        <h3>
                          {item.nome}
                        </h3>
                        <p className='text-xs text-zinc-400'>
                          {
                            item.desc
                          }
                        </p>
                      </div>
                      <div className='flex flex-col items-center justify-start mt-1'>
                        <p className='text-sm'>
                          Preço:
                        </p>
                        <p className='text-xs'>
                          R${item.preco.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )
                  ))
              }
            </div>
            {
              itens.length == 0 && (
                <div className='flex flex-col items-center gap-2'>
                  <p className='text-zinc-400 text-sm'>
                    Sem itens no carrinho
                  </p>
                  <ShoppingCartIcon className='text-zinc-500 w-10 h-10'></ShoppingCartIcon>
                </div>
              )
            }
          </ScrollArea>
        </div>
      </div>

      <div className='bg-zinc-900 w-full h-full flex flex-col items-center rounded-t-lg p-4'>
        <h2 className='mb-4 font-semibold text-lg'>Escolha Filtros</h2>
        <Input
          className="bg-zinc-800 border-zinc-500 text-zinc-400"
          placeholder="Pesquisar"
        >
        </Input>

        <ScrollArea className="w-full h-[300px] mt-6">

        </ScrollArea>
      </div>
      {isOpenCart &&
  createPortal(
    <div className="fixed top-0 left-0 z-50">
      <Carrinho onClose={() => setOpenCart(false)}/>
    </div>,
    document.body
  )}
    </aside>
  )
}

export default Aside