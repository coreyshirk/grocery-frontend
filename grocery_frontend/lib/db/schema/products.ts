import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { categories } from "./categories"
import { type getProducts } from "@/lib/api/products/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const products = sqliteTable('products', {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  productName: text("product_name").notNull(),
  categoryId: text("category_id").notNull(),
  description: text("description"),
  weight: integer("weight"),
  unit: text("unit"),
  imageUrl: text("image_url"),
  
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

});


// Schema for products - used to validate API requests
const baseSchema = createSelectSchema(products).omit(timestamps)

export const insertProductSchema = createInsertSchema(products).omit(timestamps);
export const insertProductParams = baseSchema.extend({
  categoryId: z.coerce.string().min(1),
  weight: z.coerce.number()
}).omit({ 
  id: true
});

export const updateProductSchema = baseSchema;
export const updateProductParams = baseSchema.extend({
  categoryId: z.coerce.string().min(1),
  weight: z.coerce.number()
})
export const productIdSchema = baseSchema.pick({ id: true });

// Types for products - used to type API request params and within Components
export type Product = typeof products.$inferSelect;
export type NewProduct = z.infer<typeof insertProductSchema>;
export type NewProductParams = z.infer<typeof insertProductParams>;
export type UpdateProductParams = z.infer<typeof updateProductParams>;
export type ProductId = z.infer<typeof productIdSchema>["id"];
    
// this type infers the return from getProducts() - meaning it will include any joins
export type CompleteProduct = Awaited<ReturnType<typeof getProducts>>["products"][number];

