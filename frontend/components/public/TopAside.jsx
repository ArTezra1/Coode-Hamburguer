import React from 'react'
import { CircleUserRound } from 'lucide-react'
import RenderCarrinho from "@/hooks/RenderCarrinho"

const TopAside = () => {
    return (
        <section className='bg-zinc-900 w-full lg:h-[52vh] flex flex-col rounded-r-lg pt-4 justify-between overflow-hidden'>
            <div className='p-2 flex gap-2 items-center mb-4'>
                <CircleUserRound className='w-10 h-10 cursor-pointer'></CircleUserRound>
                <div>
                    <h1 className='text-lg'>
                        Perfil
                    </h1>
                    <p className='text-zinc-400 text-sm leading-3'>
                        Descrição
                    </p>
                </div>
            </div>
            <RenderCarrinho></RenderCarrinho>
        </section>
    )
}

export default TopAside