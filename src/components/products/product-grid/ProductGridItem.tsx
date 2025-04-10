"use client";

import { Product } from '@/interfaces'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

interface Props {
    product: Product;
}

export const ProductGridItem = ({ product }: Props) => {

    const [displayImage, setdisplayImage] = useState( product.images[0])

  return (
    <Link className='rounded-sm overflow-hidden fade-in group'
    href={`/product/${ product.slug }`}>
        <Image
            src={`/products/${displayImage}`}
            alt={product.title}
            className='w-full object-cover rounded transition-opacity duration-300'
            width={ 500 }
            height={ 500 }
            onMouseEnter={() => setdisplayImage( product.images[1])}
            onMouseLeave={() => setdisplayImage( product.images[0])}
        />
        <div className='p-2 flex flex-col'>
            <span className='group-hover:text-blue-950 font-semibold'>{ product.title }</span>
            <span className='text-md font-bold'>${ product.price }</span>
        </div>
    </Link>
  )
}
