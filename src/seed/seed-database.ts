import { prisma } from "../lib/prisma";
import { initialData } from "./seed";

async function main() {

    //1. Borrar registros previos
//    await Promise.all([
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
//    ]);

    // Categories

    const { categories, products } = initialData;

    const categoriesData = categories.map((category) => ({
        name: category
    }))

    await prisma.category.createMany({
        data: categoriesData,
    });

    const categoriesDb = await prisma.category.findMany();
    
    const categoriesMap = categoriesDb.reduce(((map, category) => {
        map[ category.name.toLowerCase() ] = category.id;
        
        return map;
    }), {} as Record<string, string>) // <string=shirt, categoryId>


    // Products
    products.forEach( async (product) => {
        const { images, type, ...rest } = product;

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type],
            }
        })

        const imagesData = images.map( img => ({
            url: img,
            productId: dbProduct.id
        }))

        await prisma.productImage.createMany({
            data: imagesData,
        })

    });


    console.log(categoriesMap);
    console.log(categoriesData);
}

(
    () => {

        if (process.env.NODE_ENV === "production") return;

        main();
    }
)();