"use client"

import { Input } from '@/components/ui/input'
import React from 'react'

const Aside = () => {
  return (
    <div className='bg-zinc-800 h-full w-[20vw] md:w-[25vw] md:flex flex-col xs:hidden rounded-br-xl fixed'>
        <div className='h-36 p-6 flex flex-col gap-4'>
          <div className='flex gap-4 items-center'>
            <img src="#" alt="#" />
              <div>
                <h2>Nome</h2>
                <p className='font-light text-zinc-500 !important'>Descrição</p>
              </div>
          </div>
          <div>

          </div>
        </div>
        <hr className='border-zinc-700 w-full'/>
        <div className='p-6 flex flex-col gap-4'>
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