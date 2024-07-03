import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type ProductId, productIdSchema, products } from "@/lib/db/schema/products";
import { categories } from "@/lib/db/schema/categories";

export const getProducts = async () => {
  const rows = await db.select({ product: products, category: categories }).from(products).leftJoin(categories, eq(products.categoryId, categories.id));
  const p = rows .map((r) => ({ ...r.product, category: r.category})); 
  return { products: p };
};

export const getProductById = async (id: ProductId) => {
  const { id: productId } = productIdSchema.parse({ id });
  const [row] = await db.select({ product: products, category: categories }).from(products).where(eq(products.id, productId)).leftJoin(categories, eq(products.categoryId, categories.id));
  if (row === undefined) return {};
  const p =  { ...row.product, category: row.category } ;
  return { product: p };
};


