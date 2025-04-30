export const revalidate = 604800; // 7 days

import { ProductSlidesShow, QuantitySelector, SizeSelector, ProductMobileSlidesShow } from "@/components";
import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";
import { getProductBySlug } from "@/actions";
import { Metadata, ResolvingMetadata } from "next";

interface Props{
    params: {
        slug: string;
    }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    // read route params
    const { slug } =  params
   
    // fetch data
    const product = await getProductBySlug(slug)
   
    // optionally access and extend (rather than replace) parent metadata
    //const previousImages = (await parent).openGraph?.images || []
   
    return {
      title: product?.title,
      description: product?.description,
      openGraph: {
        title: product?.title,
        description: product?.description,
        images: [`/products/${ product?.images[1] }`],
      },
    }
  }

export default async function ProductBySlug({params}: Props) {

    const { slug } = params;
    
    const product = await getProductBySlug(slug);

    if(!product){
        notFound();
    }

    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mxw-secondary mx-auto md:mt-5 mb-10">

            {/* Slideshow */}
            <div className="col-span-1 md:col-span-2 md:mx-5">

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
                    className="hidden md:flex flex-col"
                />

            </div>


            {/* Details */}
            <div className="col-span-1 px-5">

                <h3 className={`${titleFont.className} anatialiased font-bold text-gray-400 text-sm xl:text-md`}>
                    Stock: { product.inStock }
                </h3>
                <h1 className={`${titleFont.className} anatialiased font-bold text-xl xl:text-3xl`}>
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
                {
                    product.inStock ?
                    <button className="btn-primary my-5"
                    //onClick={}
                    >
                        Agregar al carrito
                    </button>
                    :
                    <button className="btn-unable my-5">Agregar al carrito</button>
                }

                {/* Description */}

                <h3 className="font-bold text-sm xl:text-xl">Descripción</h3>

                <p className="font-light xl:text-lg">{ product.description }</p>

            </div>
        </div>
    )
}