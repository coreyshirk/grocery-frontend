import { type Product } from "@/lib/db/schema/products";
import { type Inventory, type CompleteInventory } from "@/lib/db/schema/inventories";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Inventory>) => void;

export const useOptimisticInventories = (
  inventories: CompleteInventory[],
  products: Product[]
) => {
  const [optimisticInventories, addOptimisticInventory] = useOptimistic(
    inventories,
    (
      currentState: CompleteInventory[],
      action: OptimisticAction<Inventory>,
    ): CompleteInventory[] => {
      const { data } = action;

      const optimisticProduct = products.find(
        (product) => product.id === data.productId,
      )!;

      const optimisticInventory = {
        ...data,
        product: optimisticProduct,
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticInventory]
            : [...currentState, optimisticInventory];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticInventory } : item,
          );
        case "delete":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, id: "delete" } : item,
          );
        default:
          return currentState;
      }
    },
  );

  return { addOptimisticInventory, optimisticInventories };
};
