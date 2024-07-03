import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  InventoryId, 
  NewInventoryParams,
  UpdateInventoryParams, 
  updateInventorySchema,
  insertInventorySchema, 
  inventories,
  inventoryIdSchema 
} from "@/lib/db/schema/inventories";

export const createInventory = async (inventory: NewInventoryParams) => {
  const newInventory = insertInventorySchema.parse(inventory);
  try {
    const [i] =  await db.insert(inventories).values(newInventory).returning();
    return { inventory: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateInventory = async (id: InventoryId, inventory: UpdateInventoryParams) => {
  const { id: inventoryId } = inventoryIdSchema.parse({ id });
  const newInventory = updateInventorySchema.parse(inventory);
  try {
    const [i] =  await db
     .update(inventories)
     .set({...newInventory, updatedAt: new Date().toISOString().slice(0, 19).replace("T", " ") })
     .where(eq(inventories.id, inventoryId!))
     .returning();
    return { inventory: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteInventory = async (id: InventoryId) => {
  const { id: inventoryId } = inventoryIdSchema.parse({ id });
  try {
    const [i] =  await db.delete(inventories).where(eq(inventories.id, inventoryId!))
    .returning();
    return { inventory: i };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

