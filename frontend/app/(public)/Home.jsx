import React from 'react'
import Aside from '@/components/public/Aside'
import Main from '@/components/public/Main'

const Landing = () => {
  return (
    <main className='flex w-screen h-screen bg-zinc-950 text-zinc-100 gap-2'>
        <div className="xs:hidden lg:block">
        <Aside></Aside>
      </div>
        <Main></Main>
    </main>
  )
}

export default Landing