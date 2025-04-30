"use server";
import { prisma } from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOptions {
    page?: number;
    take?: number;
    gender?: Gender;
} 

export const getPaginatedProductsWithImages = async({
    page = 1,
    take = 12,
    gender,
}: PaginationOptions) => {

    if ( isNaN( Number(page))) page = 1;
    if ( page < 1) page = 1;

    if ( isNaN( Number(take))) take = 12;
    if ( take < 1) take = 12;

    try {
        const [products, totalCount] = await Promise.all([
        // Obtengo los productos - products
        prisma.product.findMany({
            take: take,
            skip: (page - 1 ) * take,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true,
                    }
                }
            },

            where: {
                gender: gender ? (gender as Gender) : undefined,
            }

        }),
        
        // Obtengo el total de productos - totalCount
        prisma.product.count({
            where:{
                gender: gender ? (gender as Gender) : undefined,
            } 
        })
        ]);

        // Calculo el total de paginas
        const totalPages = Math.ceil(totalCount / take);

        return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map( products => ({
                ...products,
                images: products.ProductImage.map( image => image.url)
            }))
        }

    }catch (e) {
        throw new Error("Error al cargar los productos")
    }

}