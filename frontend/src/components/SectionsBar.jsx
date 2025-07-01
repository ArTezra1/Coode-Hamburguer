"use client"

import clsx from 'clsx'
import React, { useState } from 'react'

const categoryMap = {
    Lanches: "burger",
    Bebidas: "drink",
    Combos: "combo",
    Outros: "other",
}

const NavSection = ({ index, section, setSection, text, onSelectCategory = () => { } }) => {
    const isActive = section === index


    const sectionCall = categoryMap[text] || "burger"

    return (
        <button
            type='button'
            onClick={() => {
                setSection(index)
                onSelectCategory(sectionCall)
            }}
            className={clsx(
                "h-8 w-24 rounded-full flex flex-col justify-center items-center transition-all duration-300 cursor-pointer",
                isActive && "bg-zinc-700"
            )}
        >
            {text}
        </button>
    )
}


const SectionsBar = ({ onSelectCategory }) => {
    const [section, setSection] = useState(0)

    return (
        <nav className='flex justify-between items-center lg:hidden m-auto mt-4 bg-zinc-800 rounded-2xl px-4 py-2'>
            <ul className='flex items-center justify-between w-full px-4 sm:px-20 py-2'>
                <NavSection
                    index={0}
                    section={section}
                    setSection={setSection}
                    text={"Lanches"}
                    onSelectCategory={onSelectCategory}
                />
                <NavSection
                    index={1}
                    section={section}
                    setSection={setSection}
                    text={"Bebidas"}
                    onSelectCategory={onSelectCategory}
                />
                <NavSection
                    index={2}
                    section={section}
                    setSection={setSection}
                    text={"Combos"}
                    onSelectCategory={onSelectCategory}
                />
                <NavSection
                    index={3}
                    section={section}
                    setSection={setSection}
                    text={"Outros"}
                    onSelectCategory={onSelectCategory}
                />
            </ul>
        </nav>
    )
}

export default SectionsBar