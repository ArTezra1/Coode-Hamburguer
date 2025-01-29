import React from 'react'

const placeholder = [
  {
    title: "pep",
    description: "p2wp",
    img:"#",
    alt: "#",
    price: "1010"
  }
]

const Main = () => {
  return (
    <div className='bg-zinc-950 h-full w-full p-6 '>
        <div className='flex flex-col items-center'>
          <h1 className='font-bold text-3xl'>Em alta</h1>

          <div className='grid grid-cols grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-6 mt-10 h-full'>
            {placeholder.map((e)=>(
              <div className='p-4 rounded-md bg-zinc-600 flex flex-col gap-4 xs:w-[70vw] md:w-[30vw]' key={e}>
                <div className='p-2 h-32 rounded-lg bg-white'>
                  <img src={e.img} alt={e.alt} />
                </div>
                <div>
                  <h2>
                    {e.title}
                  </h2>
                  <p>
                    {e.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default Main