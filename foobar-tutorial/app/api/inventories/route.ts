import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createInventory,
  deleteInventory,
  updateInventory,
} from "@/lib/api/inventories/mutations";
import { 
  inventoryIdSchema,
  insertInventoryParams,
  updateInventoryParams 
} from "@/lib/db/schema/inventories";

export async function POST(req: Request) {
  try {
    const validatedData = insertInventoryParams.parse(await req.json());
    const { inventory } = await createInventory(validatedData);

    revalidatePath("/inventories"); // optional - assumes you will have named route same as entity

    return NextResponse.json(inventory, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}


export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateInventoryParams.parse(await req.json());
    const validatedParams = inventoryIdSchema.parse({ id });

    const { inventory } = await updateInventory(validatedParams.id, validatedData);

    return NextResponse.json(inventory, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = inventoryIdSchema.parse({ id });
    const { inventory } = await deleteInventory(validatedParams.id);

    return NextResponse.json(inventory, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
