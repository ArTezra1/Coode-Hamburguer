import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import SearchBar from '@/components/SearchBar'
import React from 'react'

const page = () => {
  return (
    <main className='w-full h-screen'>
      <Header />
      <SearchBar />


      <NavBar />
    </main>
  )
}

export default page