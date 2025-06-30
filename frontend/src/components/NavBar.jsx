import React from 'react'

import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';


const NavBar = () => {
    return (
        <nav className="flex justify-between items-center lg:hidden bg-[#1D2C40] w-[96vw] h-12 rounded-xl fixed bottom-1 left-1/2 transform -translate-x-1/2 px-4 sm:px-20 py-2">
            <div>
                <HomeIcon />
            </div>
            <div>
                <ShoppingCartIcon />
            </div>
            <div>
                <ReceiptIcon />
            </div>
            <div>
                <PersonIcon />
            </div>
        </nav>
    )
}

export default NavBar