import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getProductById } from "@/lib/api/products/queries";
import { getCategories } from "@/lib/api/categories/queries";import OptimisticProduct from "./OptimisticProduct";


import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";


export const revalidate = 0;

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {

  return (
    <main className="overflow-auto">
      <Product id={params.productId} />
    </main>
  );
}

const Product = async ({ id }: { id: string }) => {
  
  const { product } = await getProductById(id);
  const { categories } = await getCategories();

  if (!product) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="products" />
        <OptimisticProduct product={product} categories={categories} />
      </div>
    </Suspense>
  );
};
