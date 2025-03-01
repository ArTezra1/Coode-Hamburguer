import React from 'react'

const Carrinho = ({ onClose }) => {
  return (
    <section className='absolute z-10 w-screen h-screen bg-zinc-950/60 flex items-center justify-center'>
        <div className='bg-zinc-500 p-4 xs:w-[80vw] lg:w-[60vw] lg:h-[70vh] xs:h-[60vh] rounded-md flex flex-col gap-8'>
            <div>
                <div className='p-10 bg-red-400' onClick={onClose}></div>
            </div>
            <div className='flex gap-4'>
                <div>
                </div>
                <div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Carrinho