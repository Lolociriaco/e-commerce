import { notFound, redirect } from "next/navigation";
import { initialData } from "@/seed/seed";
import { Pagination, ProductGrid } from "@/components";
import { Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import { Gender } from "@prisma/client";



interface Props {
    params: {
        gender: string;
    },
    searchParams: {
        page?: string;
    }
}

export default async function GenderByPage({params, searchParams}: Props){
    const { gender } = params;
    const genders = ["men", "women", "kid","unisex" ]
    
    if(!genders.includes(gender)){
        notFound();
    }

    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    const { products, totalPages } = await getPaginatedProductsWithImages({
         page, 
         gender: gender as Gender 
        });

    //const categories = ["sobre-ruedas", "ludicos", "rompecabezas"]

    const labels : Record<string, string> = {
        'men': 'hombres',
        'women': 'mujeres',
        'kid': 'niños',
        'unisex': 'todos'
    }

    const productsFiltered = products.filter(product =>  product.gender === gender)

    if(productsFiltered.length === 0){
        redirect(`/gender/${gender}`);
    }

    return(
        <div>
            <Title 
                    title={`Articulos para ${labels[gender]}`}
                    subtitle="Todos los productos"
                    className="font-semibold"
                  />

            <ProductGrid
                products={productsFiltered}
            />

            <Pagination totalPages={totalPages}/>
        </div>
    )
}