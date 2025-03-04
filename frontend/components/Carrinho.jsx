import clsx from 'clsx'
import { X } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'

const Carrinho = ({ onClose }) => {
    const [isConfirmed, setIsConfirmed] = useState(0)

    function handleConfirmed(){
        setIsConfirmed(+1)
    }

  return (
    <section className='absolute z-10 w-screen h-screen bg-zinc-950/60 flex items-center justify-center text-zinc-100'>
        <div className='bg-zinc-800 p-4 xs:w-[80vw] lg:w-[60vw] lg:h-[70vh] xs:h-[60vh] rounded-md flex gap-8'>
            <div className='md:flex flex-1 mt-5 xs:hidden'>
                <div className='flex flex-col items-center mt-6'>
                    <div className={clsx(isConfirmed > 0 ? 'p-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black' : 'p-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-black')}>
                        1
                    </div>
                    <p>Confirmar</p>
                </div>
                <div className='w-full relative'>
                    <hr className='absolute w-[100%] mt-10 left-0'/>
                </div>
                <div className='flex flex-col items-center mt-6'>
                    <div className={clsx(isConfirmed == 2 ? 'p-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black' : 'p-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-black')}>
                        2
                    </div>
                    <p>Pagamento</p>
                </div>
            </div>
            
            <div className='flex-1 h-full w-full flex flex-col gap-2'>
                <p className='relative flex justify-end items-start text-zinc-300'>
                    <X className='w-10 h-10 cursor-pointer hover:text-zinc-100 transition-colors' onClick={onClose}></X>
                </p>
                <div className='flex flex-col gap-4 flex-1 border border-zinc-300 h-[80%] rounded-md'>
                    <div>
                        <h1>JOBKBL</h1>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit accusamus dolores tenetur quod ipsa error perferendis suscipit velit dolorum cum deserunt commodi praesentium, laudantium doloremque neque voluptas libero quas ullam!</p>

                        <Button>Confirmar pedido</Button>                        
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Carrinho