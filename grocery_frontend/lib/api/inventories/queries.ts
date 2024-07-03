import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type InventoryId, inventoryIdSchema, inventories } from "@/lib/db/schema/inventories";
import { products } from "@/lib/db/schema/products";

export const getInventories = async () => {
  const rows = await db.select({ inventory: inventories, product: products }).from(inventories).leftJoin(products, eq(inventories.productId, products.id));
  const i = rows .map((r) => ({ ...r.inventory, product: r.product})); 
  return { inventories: i };
};

export const getInventoryById = async (id: InventoryId) => {
  const { id: inventoryId } = inventoryIdSchema.parse({ id });
  const [row] = await db.select({ inventory: inventories, product: products }).from(inventories).where(eq(inventories.id, inventoryId)).leftJoin(products, eq(inventories.productId, products.id));
  if (row === undefined) return {};
  const i =  { ...row.inventory, product: row.product } ;
  return { inventory: i };
};


