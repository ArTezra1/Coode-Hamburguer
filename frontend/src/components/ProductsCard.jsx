import Image from 'next/image'
import React from 'react'

const ProductsCard = ({ products = [] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-center gap-4 w-full lg:pb-8">
      {products.map((product) => (
        <div key={product._id} className="border border-zinc-700 rounded-md w-full flex h-40">
          <Image
            src={product.imageSrc}
            width={160}
            height={160}
            alt={product.name}
            className='rounded-md border border-zinc-700'
          />
          <div className='px-4 py-2 relative w-full'>
            <h3 className='font-semibold text-md lg:text-lg'>
              {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
            </h3>
            <p className='text-sm lg:text-base'>
              {product.description.charAt(0).toUpperCase() + product.description.slice(1)}
            </p>
            {console.log(product.ingredients)}
            <p className='text-xs lg:text-sm text-zinc-400 mt-1 lg:mt-0'>
              {
                product.category === "burger" && `Ingredientes: ${product.ingredients.map((e) => {
                  return " " + e.charAt(0).toUpperCase() + e.slice(1)
                })}`
                ||
                product.category === "drink" && `Marca: ${product.brand}`
                ||
                product.category === "combo" && `Itens: ${product.itensCombo}`
              }
            </p>
            <div className='absolute bottom-2 flex justify-between w-[90%]'>
              <h4 className='text-lg font-semibold text-emerald-400'>
                R$: {product.price.toFixed(2).replace(".", ",")}
              </h4>
              <div className='flex gap-4 items-center justify-center'>
                <button className='px-4 border border-emerald-700 bg-emerald-400 rounded-md text-black hover:scale-105 transition-all duration-300 cursor-pointer font-bold'
                  onClick={() => addProduct(product._id, product.price)}
                >
                  +
                </button>
                <button className='px-4 border border-orange-700 bg-orange-600 rounded-md text-black hover:scale-105 transition-all duration-300 cursor-pointer font-bold'
                onClick={() => removeProduct(product._id, product.price)}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


export default ProductsCard