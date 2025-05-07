"use client"
import { useCartStore } from "@/store"
import { currencyFormat } from "@/utils"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"


export const OrderSummary = () => {

  const [loaded, setLoaded ] = useState(false);

  const cart = useCartStore(state => state.cart);
  const { itemsInCart, subTotal, total, tax } = useMemo(() => {
    return useCartStore.getState().getSummaryInformation();
  }, [cart]);

  
  useEffect(() => {
    setLoaded(true);
  },[])

  if (!loaded) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="grid grid-cols-2 gap-4">
          <div className="h-6 bg-gray-300 shadow-md rounded col-span-1"></div>
          <div className="h-6 bg-gray-300 shadow-md rounded col-span-1"></div>

          <div className="h-6 bg-gray-300 shadow-md rounded col-span-1"></div>
          <div className="h-6 bg-gray-300 shadow-md rounded col-span-1"></div>

          <div className="h-6 bg-gray-300 shadow-md rounded col-span-1"></div>
          <div className="h-6 bg-gray-300 shadow-md rounded col-span-1"></div>
        </div>

        <div className="h-10 bg-gray-300 shadow-md rounded w-1/2 mt-24"></div>
        <div className="h-12 bg-gray-300 shadow-md rounded w-full mt-5"></div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2">

        <span>No. Productos</span>
        <span className="text-right">{ itemsInCart === 1 ? "1 artículo" 
        :
       `${currencyFormat( itemsInCart ) } ` } articulos</span>

        <span>Subtotal</span>
        <span className="text-right">{ currencyFormat( subTotal ) }</span>

        <span>Impuestos (16%)</span>
        <span className="text-right">{ currencyFormat( tax ) }</span>

      </div>
      <div className="mt-24 w-full">

        <div className="flex justify-between">
          <span className="text-2xl mt-5 font-semibold">Total</span>
          <span className="text-right mt-5 text-2xl font-semibold">{ currencyFormat(total) }</span>
        </div>

        <Link href="/checkout/address" className="flex justify-center mt-5 btn-primary">
          Checkout
        </Link>
      </div>
    </>
  )
}
