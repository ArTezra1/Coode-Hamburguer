"use client"

import React, { useState } from 'react'

import Link from 'next/link';

import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';

import clsx from 'clsx';

const NavItem = ({ index, section, setSection, icon, href, text }) => {
    const isActive = section === index;

    return (
        <Link
            href={`${href || "/"}`}
            onClick={() => setSection(index)}
            className="flex flex-col justify-center items-center"
        >
            <div className={clsx(
                "z-10 transition-all duration-300",
                isActive && "bg-zinc-700 h-12 w-12 rounded-full flex flex-col justify-center items-center -mt-6"
            )}>
                {icon}
            </div>
            <div>
                {text}
            </div>
        </Link>
    )
}

const NavBar = () => {
    const [section, setSection] = useState(0)

    return (
        <nav className="flex justify-between items-center lg:hidden bg-zinc-800 w-[96vw] h-14 rounded-xl fixed bottom-1 left-1/2 transform -translate-x-1/2 px-8 sm:px-20 py-2 z-10">
            <NavItem
                index={0}
                icon={<HomeIcon className="text-white" />}
                section={section}
                setSection={setSection}
                text={"Cardápio"}
                href={"/"}
            />
            <NavItem
                index={1}
                icon={<ReceiptIcon className="text-white" />}
                section={section}
                setSection={setSection}
                text={"Pedidos"}
            />
            <NavItem
                index={2}
                icon={<PersonIcon className="text-white" />}
                section={section}
                setSection={setSection}
                text={"Perfil"}
            />
        </nav>
    )
}

export default NavBar
