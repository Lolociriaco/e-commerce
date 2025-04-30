
import Link from "next/link"
import { Title } from "@/components"
import { initialData } from "@/seed/seed"
import Image from "next/image"
import clsx from "clsx"
import { IoCartOutline } from "react-icons/io5"


const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
    initialData.products[3]
]

interface Props{
    params: {
        id: string;
    }
}

export default function OrderById( {params}: Props ) {

    const { id } = params

    //verificar si el id es de un usuario o de un adminitstrador
    //se pude hacer con redirect(/)



    return(
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

            <div className="flex flex-col w-full max-w-[1200px] mx-10">

                <Title title={`Orden #${ id }`}/>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* Carrrito  */}

                    <div className="flex flex-col">

                        <div className={
                            clsx(
                                "flex items-center rounded-lg py-2 px-3.5 font-semibold text-white mb-5",
                                {
                                    "bg-red-500": true,
                                    "bg-green-700": false
                                }
                            )
                        }>
                            <IoCartOutline size={25}/>
                            <span className="mx-2">Esperando el pago</span>
                            {/*<span className="mx-2">Pago completado</span>*/}
                        </div>

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
                                <p>${product.price} x 3</p>
                                <p className="font-semibold">Subtotal: ${ product.price * 3 }</p>

                                <button className="underline mt-1">
                                    Eliminar
                                </button>
                            </div>

                        </div>
                    ))
                }
                </div>

                {/* Checkout - Resumn orden */}

                    <div className="bg-white rounded-xl shadow-xl p-7">

                        <h2 className="text-2xl mb-2">Dirección de entrega</h2>
                        <div className="mb-10">
                            <p>Lorenzo Ciriaco</p>
                            <p>Av. Siempre Viva</p>
                            <p>Col. Centro</p>
                            <p>Tigre</p>
                            <p>Buenos Aires</p>
                            <p>+54 11 3055-3322</p>
                        </div>

                        <hr className="w-full h-0.5 rounded bg-gray-200 mb-10"/>


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

                            <div className={
                                clsx(
                                    "flex items-center rounded-lg py-2 px-3.5 font-semibold text-white mt-5",
                                    {
                                        "bg-red-500": true,
                                        "bg-green-700": false
                                    }
                                )
                            }>
                                <IoCartOutline size={25}/>
                                <span className="mx-2">Esperando el pago</span>
                                {/*<span className="mx-2">Pago completado</span>*/}
                            </div>
                            
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}