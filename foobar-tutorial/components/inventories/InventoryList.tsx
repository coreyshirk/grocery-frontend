"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Inventory, CompleteInventory } from "@/lib/db/schema/inventories";
import Modal from "@/components/shared/Modal";
import { type Product, type ProductId } from "@/lib/db/schema/products";
import { useOptimisticInventories } from "@/app/(app)/inventories/useOptimisticInventories";
import { Button } from "@/components/ui/button";
import InventoryForm from "./InventoryForm";
import { PlusIcon } from "lucide-react";

type TOpenModal = (inventory?: Inventory) => void;

export default function InventoryList({
  inventories,
  products,
  productId 
}: {
  inventories: CompleteInventory[];
  products: Product[];
  productId?: ProductId 
}) {
  const { optimisticInventories, addOptimisticInventory } = useOptimisticInventories(
    inventories,
    products 
  );
  const [open, setOpen] = useState(false);
  const [activeInventory, setActiveInventory] = useState<Inventory | null>(null);
  const openModal = (inventory?: Inventory) => {
    setOpen(true);
    inventory ? setActiveInventory(inventory) : setActiveInventory(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeInventory ? "Edit Inventory" : "Create Inventory"}
      >
        <InventoryForm
          inventory={activeInventory}
          addOptimistic={addOptimisticInventory}
          openModal={openModal}
          closeModal={closeModal}
          products={products}
        productId={productId}
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticInventories.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticInventories.map((inventory) => (
            <Inventory
              inventory={inventory}
              key={inventory.id}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const Inventory = ({
  inventory,
  openModal,
}: {
  inventory: CompleteInventory;
  openModal: TOpenModal;
}) => {
  const optimistic = inventory.id === "optimistic";
  const deleting = inventory.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("inventories")
    ? pathname
    : pathname + "/inventories/";


  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : "",
      )}
    >
      <div className="w-full">
        <div>{inventory.productId}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={ basePath + "/" + inventory.id }>
          Edit
        </Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No inventories
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new inventory.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Inventories </Button>
      </div>
    </div>
  );
};
