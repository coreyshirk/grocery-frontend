"use server";

import { revalidatePath } from "next/cache";
import {
  createInventory,
  deleteInventory,
  updateInventory,
} from "@/lib/api/inventories/mutations";
import {
  InventoryId,
  NewInventoryParams,
  UpdateInventoryParams,
  inventoryIdSchema,
  insertInventoryParams,
  updateInventoryParams,
} from "@/lib/db/schema/inventories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateInventories = () => revalidatePath("/inventories");

export const createInventoryAction = async (input: NewInventoryParams) => {
  try {
    const payload = insertInventoryParams.parse(input);
    await createInventory(payload);
    revalidateInventories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateInventoryAction = async (input: UpdateInventoryParams) => {
  try {
    const payload = updateInventoryParams.parse(input);
    await updateInventory(payload.id, payload);
    revalidateInventories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteInventoryAction = async (input: InventoryId) => {
  try {
    const payload = inventoryIdSchema.parse({ id: input });
    await deleteInventory(payload.id);
    revalidateInventories();
  } catch (e) {
    return handleErrors(e);
  }
};