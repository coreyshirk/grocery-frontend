import { type Category } from "@/lib/db/schema/categories";
import { type Product, type CompleteProduct } from "@/lib/db/schema/products";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Product>) => void;

export const useOptimisticProducts = (
  products: CompleteProduct[],
  categories: Category[]
) => {
  const [optimisticProducts, addOptimisticProduct] = useOptimistic(
    products,
    (
      currentState: CompleteProduct[],
      action: OptimisticAction<Product>,
    ): CompleteProduct[] => {
      const { data } = action;

      const optimisticCategory = categories.find(
        (category) => category.id === data.categoryId,
      )!;

      const optimisticProduct = {
        ...data,
        category: optimisticCategory,
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticProduct]
            : [...currentState, optimisticProduct];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticProduct } : item,
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

  return { addOptimisticProduct, optimisticProducts };
};
