import AsideBar from '@/components/admin/AsideBar'
import React from 'react'
import Perfil from "./(perfil)/Page"

const Page = () => {
  return (
    <main className='bg-zinc-950 w-screen h-screen text-zinc-100 flex'>
        <AsideBar></AsideBar>
        <Perfil></Perfil>
    </main>
  )
}

export default Page