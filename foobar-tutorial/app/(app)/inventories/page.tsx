import { Suspense } from "react";

import Loading from "@/app/loading";
import InventoryList from "@/components/inventories/InventoryList";
import { getInventories } from "@/lib/api/inventories/queries";
import { getProducts } from "@/lib/api/products/queries";

export const revalidate = 0;

export default async function InventoriesPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Inventories</h1>
        </div>
        <Inventories />
      </div>
    </main>
  );
}

const Inventories = async () => {
  
  const { inventories } = await getInventories();
  const { products } = await getProducts();
  return (
    <Suspense fallback={<Loading />}>
      <InventoryList inventories={inventories} products={products} />
    </Suspense>
  );
};
