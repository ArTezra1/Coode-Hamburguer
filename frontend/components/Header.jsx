import React from 'react'

const Header = () => {
  return (
    <header className='bg-zinc-900 w-full h-[34vh] flex flex-col items-center rounded-b-lg pt-4'>
      <div className='flex flex-col items-center gap-4 w-[75%]'>
        <h1 className='font-semibold text-xl'>
          Bem-vindo a nossa Hamburgueria!
        </h1>
        <p className='text-zinc-400 text-sm text-center leading-4'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, soluta voluptatum blanditiis, illum iure ullam accusamus dolor odit laboriosam porro iusto, earum aut doloribus incidunt explicabo possimus quae aliquam exercitationem.
        </p>
      </div>
    </header>
  )
}

export default Header