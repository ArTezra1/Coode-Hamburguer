import React from 'react'

import Link from 'next/link';

import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';

const NavItem = ({ href, icon, text }) => {
    return (
        <Link
            href={href}
            className='flex flex-col justify-center items-center hover:scale-110 transition-all duration-300'>
            {icon}
            <h3 className='font-semibold'>{text}</h3>
        </Link>
    )
}

const Header = () => {
    return (
        <section className='w-full '>
            <header className='h-[25vh] bg-zinc-800 rounded-b-[8px] m-auto'>
                header
            </header>

            <section className='hidden lg:flex gap-8 w-full h-17 justify-center items-center mt-1'>
                <NavItem
                    href={"/"}
                    icon={<ReceiptIcon
                        className="text-white"
                    />}
                    text={"Pedidos"}
                />

                <NavItem
                    href={"/"}
                    icon={<PersonIcon
                        className="text-white"
                    />}
                    text={"Perfil"}
                />
            </section>

            <hr className='border-zinc-800 hidden lg:block'/>
        </section>
    )
}

export default Header