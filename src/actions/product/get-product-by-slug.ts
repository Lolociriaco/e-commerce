import { prisma } from "@/lib/prisma";


export const getProductBySlug = async ( slug: string ) => {

    try{
    const product = await prisma.product.findFirst({
        include:{
            ProductImage: {
                select: {
                    url: true,
                }
            }
        },

        where: {
            slug: slug,
        }
    })
    
    if(!product) return null;

    const { ProductImage, ...rest } = product

    return {
        ...rest,
        images: product.ProductImage.map( image => image.url )
    }

    } catch(error){
        console.error('Error fetching product by slug:', error);
        throw new Error('Failed to fetch product data');
    }
}