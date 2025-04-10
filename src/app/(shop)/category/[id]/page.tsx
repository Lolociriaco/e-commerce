import { notFound } from "next/navigation";
import { initialData } from "@/seed/seed";
import { ProductGrid } from "@/components";
import { Title } from "@/components";
import { Category } from "@/interfaces";

const products = initialData.products;

interface Props {
    params: {
        id: Category;
    }
}

export default function({params}: Props){
    const { id } = params;
    //const categories = ["sobre-ruedas", "ludicos", "rompecabezas"]
    const categories = ["men", "women", "kid"]

    const labels : Record<Category, string> = {
        'men': 'hombres',
        'women': 'mujeres',
        'kid': 'niños',
        'unisex': 'todos'
    }

    if(!categories.includes(id)){
        notFound()
    }

    const productsFiltered = products.filter(product =>  product.gender === id)

    return(
        <div>
            <Title 
                    title={`Articulos para ${labels[id]}`}
                    subtitle="Todos los productos"
                    className="font-semibold"
                  />

            <ProductGrid
                products={productsFiltered}
                />

        </div>
    )
}