
import Link from "next/link"
import { QuantitySelector, Title } from "@/components"
import { initialData } from "@/seed/seed"
import Image from "next/image"
import { redirect } from "next/navigation"


const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
    initialData.products[3]
]


export default function(){

    //redirect('/empty')


    return(
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            
            <div className="flex flex-col w-full mxw-secondary mx-10">

                <Title title="Carrito"  />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Carrrito  */}

                    <div className="flex flex-col mt-5">
                        <button className="btn-primary my-5">Seguir comprando</button>
                        


                    {/* Items  */}

                    {
                        productsInCart.map((product, index) => (
                            
                            <div key={product.slug} className="flex mb-7">
                            <Image
                                src={`/products/${product.images[0]}`}
                                width={300}
                                height={300}
                                alt={product.title[index]}
                                className="mr-5 rounded object-cover w-[100px] h-[100px]"
                                />

                            <div className="">
                                <h2 className="font-semibold">{product.title}</h2>
                                <p>${product.price}</p>
                                <QuantitySelector quantity={2}/>

                                <button className="underline mt-1">
                                    Eliminar
                                </button>
                            </div>

                        </div>
                    ))
                }
                </div>

                {/* Checkout - Resumn orden */}

                    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
                        <h2 className="text-2xl mb-2 font-semibold">Resumen de orden</h2>

                        <div className="grid grid-cols-2">

                            <span>No. Productos</span>
                            <span className="text-right">3 articulos</span>

                            <span>Subtotal</span>
                            <span className="text-right">$ 100</span>

                            <span>Impuestos (16%)</span>
                            <span className="text-right">$ 135</span>

                        </div>

                        <div className="mt-24 w-full">

                            <div className="flex justify-between">
                                <span className="text-2xl mt-5">Total</span>
                                <span className="text-right mt-5 text-2xl font-semibold">$ 300</span>
                            </div>

                            <Link href="/checkout/address" className="flex justify-center mt-5 btn-primary">
                                Checkout
                            </Link>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}