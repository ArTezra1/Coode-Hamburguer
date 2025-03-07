import React from 'react'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import NavRender from './NavRender'

const BottomAside = () => {
  return (
    <section className='bg-zinc-900 w-full h-full flex flex-col items-center rounded-t-lg pt-4 px-2'>
      <h1 className='font-bold text-xl'>
        Categorias
      </h1>
      <div className='w-full h-full'>
        <ScrollArea className="w-full h-[90%] mt-6 px-4">
          <NavRender></NavRender>
        </ScrollArea>
      </div>
    </section>
  )
}

export default BottomAside