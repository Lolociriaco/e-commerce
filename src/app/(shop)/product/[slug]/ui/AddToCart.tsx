"use client"

import { QuantitySelector, SizeSelector } from "@/components"
import { CartProduct, Product, Size } from "@/interfaces"
import { useCartStore } from "@/store"
import { useState } from "react"

interface Props {
    product: Product,
}

export const AddToCart = ({ product }: Props) => {

    const addProductToCart = useCartStore( state => state.addProductToCart );

    const [size, setSize] = useState<Size|undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState(false)

    const addToCart = () => {
        setPosted(true);
        if (!size) return;
        
        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            img: product.images[0]
        }
        
        addProductToCart(cartProduct);
        setPosted(false);
        setQuantity(1);
        setSize(undefined);
    }

  return (
    <>
        {posted && !size && (   
            <span className="text-red-600 font-semibold">
                Debe seleccionar una talla*
            </span>
        )}

        {/* Select Size */}
        <SizeSelector 
        selectedSize={ size }
        availableSizes={product.sizes}
        onSizeChange={setSize}
        />

        {/* Select How Many */}
        <QuantitySelector 
            initialQuantity={quantity}
            onQuantityChange={ setQuantity }
            maxQuantity={ product.inStock }
        />

        {/* Button */}
        {
            product.inStock ?
            <button className="btn-primary my-5"
            onClick={addToCart}
            >
                Agregar al carrito
            </button>
            :
            <button className="btn-unable my-5">Agregar al carrito</button>
        }
    </>
  )
}
