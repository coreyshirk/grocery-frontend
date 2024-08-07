"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/products/useOptimisticProducts";
import { type Product } from "@/lib/db/schema/products";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import ProductForm from "@/components/products/ProductForm";
import { type Category, type CategoryId } from "@/lib/db/schema/categories";

export default function OptimisticProduct({ 
  product,
  categories,
  categoryId 
}: { 
  product: Product; 
  
  categories: Category[];
  categoryId?: CategoryId
}) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Product) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticProduct, setOptimisticProduct] = useOptimistic(product);
  const updateProduct: TAddOptimistic = (input) =>
    setOptimisticProduct({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <ProductForm
          product={optimisticProduct}
          categories={categories}
        categoryId={categoryId}
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateProduct}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticProduct.productName}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticProduct.id === "optimistic" ? "animate-pulse" : "",
        )}
      >
        {JSON.stringify(optimisticProduct, null, 2)}
      </pre>
    </div>
  );
}
