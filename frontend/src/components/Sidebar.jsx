"use client"

import React from 'react'
import TopSidebar from './TopSidebar'
import BottomSidebar from './BottomSidebar'

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-[#130F0C] hidden lg:flex flex-col">
      <div className="flex flex-col gap-1 h-full">
        <TopSidebar />
        <BottomSidebar />
      </div>
    </aside>
  )
}

export default Sidebar
