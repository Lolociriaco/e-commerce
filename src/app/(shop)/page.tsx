import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default function Home() {
  return (
    <div className="px-5 lg:px-20">
      <Title 
        title="Tienda"
        subtitle="Todos los productos"
        //className=""
      />

      <ProductGrid
        products={products}
      />
    </div>        
  );
}
