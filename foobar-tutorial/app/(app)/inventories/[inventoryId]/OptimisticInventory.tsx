"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/inventories/useOptimisticInventories";
import { type Inventory } from "@/lib/db/schema/inventories";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import InventoryForm from "@/components/inventories/InventoryForm";
import { type Product, type ProductId } from "@/lib/db/schema/products";

export default function OptimisticInventory({ 
  inventory,
  products,
  productId 
}: { 
  inventory: Inventory; 
  
  products: Product[];
  productId?: ProductId
}) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Inventory) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticInventory, setOptimisticInventory] = useOptimistic(inventory);
  const updateInventory: TAddOptimistic = (input) =>
    setOptimisticInventory({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <InventoryForm
          inventory={optimisticInventory}
          products={products}
        productId={productId}
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateInventory}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticInventory.productId}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticInventory.id === "optimistic" ? "animate-pulse" : "",
        )}
      >
        {JSON.stringify(optimisticInventory, null, 2)}
      </pre>
    </div>
  );
}
