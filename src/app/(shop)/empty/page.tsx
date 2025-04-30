import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { title } from "node:process";
import { IoCartOutline } from "react-icons/io5";

export default function EmptyCart() {
    return(
        <div className="flex justify-center items-center h-[800px]">
            <IoCartOutline size={ 80 } className="mx-5"/>
            <div className="flex flex-col items-center">
                <h1 className={`${titleFont.className} text-2xl font-semibold`}>
                    Tu carrito esta vacio
                </h1>

                <Link href="/" className="underline mt-5 text-gray-700">
                    Volver
                </Link>
            </div>
        </div>
    )
}