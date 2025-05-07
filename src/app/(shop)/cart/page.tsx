
import { Title } from "@/components"
import { ProductsInCart } from "./ui/ProductsInCart"
import { OrderSummary } from "./ui/OrderSummary"



export default function () {

    //redirect('/empty')

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-full mxw-secondary mx-10">
                <Title title="Carrito" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* Carrrito  */}
                    <div className="flex flex-col">
                        <button className="btn-primary mb-5">Seguir comprando</button>

                        {/* Items  */}
                        <ProductsInCart />
                    </div>

                    {/* Checkout - Resumn orden */}
                    <div className="bg-white rounded-xl shadow-xl px-7 py-5 h-fit">
                        <h2 className="text-2xl mb-2 font-semibold">Resumen de orden</h2>
                        <OrderSummary/>
                    </div>
                </div>
            </div>
        </div>
    )
}