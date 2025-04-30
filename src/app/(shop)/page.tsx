export const revalidate = 300; // 5 minutes

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  }
}


export default async function Home({ searchParams }: Props) {

  const page = searchParams.page ? parseInt ( searchParams.page) : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({ page });

  if ( products.length === 0) {
    redirect("/");
  }

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

      <Pagination totalPages={totalPages}/>

    </div>
  );
}
