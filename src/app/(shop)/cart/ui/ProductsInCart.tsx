"use client"
import { QuantitySelector } from "@/components"
import { useCartStore } from "@/store"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"


export const ProductsInCart = () => {

    const updateProductQuantity = useCartStore( state => state.updateProductQuantity )
    const removeProduct = useCartStore( state => state.removeProduct )
    const productsInCart = useCartStore( state => state.cart )

    const [loaded, setLoaded ] = useState(false);

    useEffect(() => {
      setLoaded(true);
    },[])

    if (!loaded) {
        return (
          <div className="space-y-7">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex mb-7 animate-pulse">
                {/* Imagen */}
                <div className="bg-gray-300 rounded w-[100px] h-[100px] mr-5" />
      
                {/* Texto */}
                <div className="flex flex-col justify-between space-y-2 flex-1">
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                  <div className="h-4 bg-gray-300 rounded w-1/4" />
                  <div className="h-8 bg-gray-300 rounded w-1/2" />
                  <div className="h-4 bg-gray-300 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        );
      }
      

    return (
        <>
        {
        productsInCart.map((product, index) => (

            <div key={`${product.slug}-${product.size}`} className="flex mb-7">
                <Image
                    src={`/products/${product.img}`}
                    width={300}
                    height={300}
                    alt={product.title[index]}
                    className="mr-5 rounded object-cover w-[100px] h-[100px]"
                />

                <div className="">
                    <Link href={`/product/${product.slug}`} className="hover:underline font-semibold cursor-pointer">
                        {product.title} - {product.size}
                    </Link>
                    <p>${product.price}</p>
                    <QuantitySelector 
                        initialQuantity={ product.quantity }
                        onQuantityChange={ quantity => updateProductQuantity(product, quantity) } />

                    <button 
                    className="underline mt-1"
                    onClick={() => removeProduct(product)}>
                        Eliminar
                    </button>
                </div>

            </div>
        ))
        }
        </>
    )
}
