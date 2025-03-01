"use client"

import { Input } from '@/components/ui/input'
import React from 'react'
import { ScrollArea } from './ui/scroll-area'
import { CircleUserRound, ShoppingCartIcon } from 'lucide-react'
import { useState } from 'react'

const Aside = () => {
  const [items, setItems] = useState(0)
  
    function renderItems() {
      setItems(+1)
    }

  return (
    <aside className='bg-zinc-950 md:w-[20vw] h-full flex flex-col items-center gap-2'>
      <div className='bg-zinc-900 w-full lg:h-[51vh] flex flex-col rounded-r-lg p-4 justify-between'>
        <div className='p-2 flex flex-col gap-1'>
          <CircleUserRound className='w-10 h-10'></CircleUserRound>
          <p>
            Perfil
          </p>
        </div>
        <div className='p-2 flex flex-col gap-1 relative'>
          <ShoppingCartIcon className='w-10 h-10'></ShoppingCartIcon>

          {
            items > 0 &&(
          <div className='absolute w-5 h-5 bg-red-700 left-12 top-8 rounded-full text-center'>
            <p className='flex items-center justify-center text-xs text-center mt-1'>
              {items}
            </p>
          </div>
            )
          }
          <p>
            Carrinho
          </p>
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
    </aside>
  )
}

export default Aside