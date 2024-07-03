import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getInventoryById } from "@/lib/api/inventories/queries";
import { getProducts } from "@/lib/api/products/queries";import OptimisticInventory from "./OptimisticInventory";


import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";


export const revalidate = 0;

export default async function InventoryPage({
  params,
}: {
  params: { inventoryId: string };
}) {

  return (
    <main className="overflow-auto">
      <Inventory id={params.inventoryId} />
    </main>
  );
}

const Inventory = async ({ id }: { id: string }) => {
  
  const { inventory } = await getInventoryById(id);
  const { products } = await getProducts();

  if (!inventory) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="inventories" />
        <OptimisticInventory inventory={inventory} products={products} />
      </div>
    </Suspense>
  );
};
