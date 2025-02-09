import { Input } from '@/components/ui/input'
import React from 'react'
import { ScrollArea } from './ui/scroll-area'

const Aside = () => {
  return (
    <aside className='bg-zinc-950 md:w-[20vw] h-full flex flex-col items-center gap-2'>
      <div className='bg-zinc-900 w-full lg:h-[51vh] flex flex-col items-center rounded-r-lg p-4'>
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