import AsideBar from '@/components/admin/AsideBar'
import React from 'react'

const Page = ({ children }) => {
  return (
    <main className='bg-zinc-950 w-screen h-screen text-zinc-100 flex'>
        <AsideBar></AsideBar>
        {children}
    </main>
  )
}

export default Page