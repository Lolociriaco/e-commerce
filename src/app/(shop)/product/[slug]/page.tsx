import { initialData } from "@/seed/seed";
import { ProductSlidesShow, QuantitySelector, SizeSelector, ProductMobileSlidesShow } from "@/components";
import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";

interface Props{
    params: {
        slug: string;
    }
}


export default function({params}: Props) {

    const { slug } = params;
    const product = initialData.products.find( product => product.slug === slug);

    if(!product){
        notFound();
    }

    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mxw-secondary mx-auto md:mt-5 mb-10 md:mx-5 ">

            {/* Slideshow */}
            <div className="col-span-1 md:col-span-2">

                {/* Mobile */}
                <ProductMobileSlidesShow
                    images={product.images}
                    title={product.title}
                    className="block md:hidden"
                />
                
                {/* Desktop */}
                <ProductSlidesShow
                    images={product.images}
                    title={product.title}
                    className="hidden md:block"
                />

            </div>


            {/* Details */}
            <div className="col-span-1 px-5">

                <h1 
                    className={`${titleFont.className} anatialiased font-bold text-xl xl:text-3xl`}>
                    { product.title }
                </h1>
                <p className="text-lg mb-5 xl:text-xl">${product.price}</p>

                {/* Select Size */}

                <SizeSelector 
                    selectedSize={product.sizes[0]}
                    availableSizes={product.sizes}
                    />

                {/* Select How Many */}

                <QuantitySelector 
                    quantity={3}
                />

                {/* Button */}

                <button className="btn-primary my-5">Agregar al carrito</button>

                {/* Description */}

                <h3 className="font-bold text-sm xl:text-xl">Descripción</h3>

                <p className="font-light xl:text-lg">{ product.description }</p>

            </div>
        </div>
    )
}