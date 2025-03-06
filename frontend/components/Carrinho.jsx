import clsx from 'clsx'
import { ShoppingCartIcon, X } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useCarrinho } from '@/contexts/CarrinhoContext'

const Carrinho = ({ onClose }) => {
    const [isConfirmed, setIsConfirmed] = useState(0)

    function handleConfirmed() {
        if (isConfirmed < 3) {
            setIsConfirmed(isConfirmed + 1)
        }
    }

    const { itens, calcularTotal } = useCarrinho()

    return (
        <section className='absolute z-10 w-screen h-screen bg-zinc-950/60 flex items-center justify-center text-zinc-100'>
            <div className='bg-zinc-800 p-4 xs:w-[80vw] lg:w-[60vw] lg:h-[70vh] xs:h-[60vh] rounded-md flex gap-8 overflow-hidden'>
                <div className='md:flex flex-1 flex-col mt-5 xs:hidden relative'>
                    <div className='flex justify-between'>
                        <div className='flex flex-col items-center mt-6'>
                            <div className={clsx(isConfirmed > 0 ? 'p-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black z-20' : 'p-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-black z-20')}>
                                1
                            </div>
                            <p>Confirmar</p>
                        </div>
                        <div className='flex flex-col items-center mt-6'>
                            <div className={clsx(isConfirmed >= 2 ? 'p-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black z-20' : 'p-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-black z-20')}>
                                2
                            </div>
                            <p>Endereço</p>
                        </div>
                        <div className='flex flex-col items-center mt-6'>
                            <div className={clsx(isConfirmed == 3 ? 'p-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black z-20' : 'p-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-black z-20')}>
                                3
                            </div>
                            <p>Pagamento</p>
                        </div>
                        <div className='w-full absolute z-10'>
                            <hr className='relative lg:w-[85%] w-[80%] mt-10 left-6' />
                        </div>
                    </div>
                        
                    {
                        itens.length > 0 ? (
                            itens.map((item, index) => (
                                <div className='mt-8 border border-zinc-300 rounded-md px-2 py-1 flex gap-4' key={index}>
                                    <div className='w-40 h-20'>
                                        <img src={item} alt={item.nome} 
                                        className='w-full h-full border rounded-md p-1'
                                        />
                                    </div>
                                    <div className='w-full'></div>
                                </div>
                            ))
                        ) : (
                            <div className='flex flex-col items-center justify-center mt-8 gap-4 border border-zinc-300 p-4 rounded-md h-full'>
                                <p className='text-zinc-300 text-xl'>
                                    Sem itens no carrinho
                                </p>
                                <ShoppingCartIcon className='w-10 h-10 text-zinc-300'>
                                </ShoppingCartIcon>
                            </div>
                        )
                    }
                </div>

                <div className='flex-1 w-full flex flex-col gap-2'>
                    <p className='relative flex justify-end items-start text-zinc-300'>
                        <X className='w-10 h-10 cursor-pointer hover:text-zinc-100 transition-colors' onClick={onClose}></X>
                    </p>
                    <div className='border border-zinc-300 rounded-md py-2 px-4 flex flex-col'>
                        <h2 className='font-bold text-lg'>Sumario</h2>
                        <div className='flex justify-between items-center mt-4'>
                            <p className='text-zinc-300'>
                                Total:
                            </p>
                            <p className='font-bold'>
                                R${calcularTotal().toFixed(2)}
                            </p>
                        </div>
                        <Button className="mt-4 hover:scale-105 transition-all" onClick={handleConfirmed}>
                            Confirmar Pedido
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Carrinho