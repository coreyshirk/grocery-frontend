import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { products } from "./products"
import { type getInventories } from "@/lib/api/inventories/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const inventories = sqliteTable('inventories', {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  productId: text("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

});


// Schema for inventories - used to validate API requests
const baseSchema = createSelectSchema(inventories).omit(timestamps)

export const insertInventorySchema = createInsertSchema(inventories).omit(timestamps);
export const insertInventoryParams = baseSchema.extend({
  productId: z.coerce.string().min(1),
  quantity: z.coerce.number()
}).omit({ 
  id: true
});

export const updateInventorySchema = baseSchema;
export const updateInventoryParams = baseSchema.extend({
  productId: z.coerce.string().min(1),
  quantity: z.coerce.number()
})
export const inventoryIdSchema = baseSchema.pick({ id: true });

// Types for inventories - used to type API request params and within Components
export type Inventory = typeof inventories.$inferSelect;
export type NewInventory = z.infer<typeof insertInventorySchema>;
export type NewInventoryParams = z.infer<typeof insertInventoryParams>;
export type UpdateInventoryParams = z.infer<typeof updateInventoryParams>;
export type InventoryId = z.infer<typeof inventoryIdSchema>["id"];
    
// this type infers the return from getInventories() - meaning it will include any joins
export type CompleteInventory = Awaited<ReturnType<typeof getInventories>>["inventories"][number];

