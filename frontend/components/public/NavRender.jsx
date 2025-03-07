import React from 'react'
import { navItens } from '@/assets/utils'

const NavRender = () => {
    return (
        <div>
            {
                navItens.map((item) => (
                    <div
                        className='flex'
                        key={item.id}
                    >
                        <div className='flex items-center gap-4 border border-zinc-300 pr-4 rounded-md w-full mb-4 cursor-pointer hover:scale-105 transition-all hover:bg-zinc-800'>
                            <img src={item.img} alt={item.nome}
                                className='h-16 xl:w-[30%] md:w-[45%] rounded-md'
                            />
                            <div className='flex flex-col gap-0 items-center justify-center text-center'>
                                <p className='font-bold text-lg'>
                                    {item.nome}
                                </p>
                                <p className='text-xs text-zinc-300 leading-3'>
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default NavRender