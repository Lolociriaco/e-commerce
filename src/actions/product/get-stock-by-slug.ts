import { prisma } from "@/lib/prisma";


export const getStockBySlug = async ( slug: string ): Promise<number> => {
    try{
        const stock = await prisma.product.findFirst({
            where: { slug },
            select: { inStock: true }
        })

        return stock?.inStock ?? 0;

    } catch(error) {
        console.error('Error fetching product by slug:', error);
        throw new Error('Failed to fetch stock data');
    }
}