"use client"

import { getProducts } from './_actions/getProducts.js'

import { useEffect, useState } from 'react'

import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import SearchBar from '@/components/SearchBar'
import SectionsBar from '@/components/SectionsBar'
import React from 'react'
import ProductsCard from '@/components/ProductsCard.jsx'

const categoryLabels = {
  burger: "Lanches",
  drink: "Bebidas",
  combo: "Combos",
  other: "Outros",
}


const page = () => {
  const [category, setCategory] = useState("burger")
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getProducts(category)
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [category])

  return (
    <main className='max-w-7xl w-full mx-auto px-4'>
      <Header />

      <SectionsBar
        onSelectCategory={setCategory}
      />

      {category === "other" && <SearchBar />}

      <section className='w-full flex flex-col items-center pb-24 lg:pb-0'>
        <h2 className="text-xl font-bold my-4">
          {categoryLabels[category]}
        </h2>
        <ProductsCard
          products={products.items}
        />
      </section>
      <NavBar />
    </main>
  )
}

export default page