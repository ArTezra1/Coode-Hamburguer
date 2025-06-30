import Image from 'next/image'
import React from 'react'

const ProductsCard = ({ products = [] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-center gap-4 w-full scroll-pb-32">
      {products.map((product) => (
        <div key={product._id} className="border rounded-md w-full flex">
            <Image 
            src={product.imageSrc}
            width={100}
            height={100}
            alt={product.name}
            className='rouded-md'
            />
          <h3>{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</h3>
        </div>
      ))}
    </div>
  )
}


export default ProductsCard