import ProductForm from '@/components/admin-panel/ProductForm'
import React from 'react'

const products = () => {
  return (
    <div className='h-[calc(100vh-96px)] w-full grid place-items-center overflow-y-auto'>
        <div className='bg-white w-[300px] rounded-lg p-4'>
        <ProductForm />
        </div>
    </div>
  )
}

export default products