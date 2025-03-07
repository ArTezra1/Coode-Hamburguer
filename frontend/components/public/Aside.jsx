"use client"

import React from 'react'
import TopAside from './TopAside'
import BottomAside from './BottomAside'

const Aside = () => {
  return (
    <aside className='bg-zinc-950 md:w-[20vw] h-full flex flex-col items-center gap-2'>
      <TopAside></TopAside>
      <BottomAside></BottomAside>
    </aside>
  )
}

export default Aside