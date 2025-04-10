import { titleFont } from "@/config/fonts"
import Link from "next/link"

export const PageNotFound = () => {
    return(
        <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
            <div className="text-center px-5 mx-5">
                <h2 className={`${titleFont} antialiased text-9xl`}>404</h2>
                <p className="font-semibold text-xl">
                    Ooops! Lo sentimos mucho.
                </p>
                <p className="font-light">
                    <span>Puedes regresar al </span>
                    <Link href="/"
                        className="font-normal hover:underline transition-all">
                            inicio
                    </Link>
                </p>
            </div>
        </div>
    )
}