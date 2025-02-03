"use client"

import { Input } from '@/components/ui/input'
import React from 'react'

const Aside = () => {
  return (
    <div className='bg-zinc-950 h-full w-[20vw] md:w-[25vw] md:flex flex-col xs:hidden rounded-br-xl gap-1 fixed'>
        <div className='h-72 p-6 flex flex-col gap-4 bg-zinc-800 rounded-md'>
          <div className='flex gap-4 items-center'>
            <img src="#" alt="#" />
              <div>
                <h2>Nome</h2>
                <p className='font-light text-zinc-500 !important'>Descrição</p>
              </div>
          </div>
          
        </div>
        
        <div className='p-6 flex flex-col gap-4 bg-zinc-800 h-full rounded-md'>
          <Input
          placeholder="Procurar"
          type="text"
          className="bg-zinc-700 border-zinc-950 text-zinc-100 "
          ></Input>
        </div>
    </div>
  )
}

export default Aside