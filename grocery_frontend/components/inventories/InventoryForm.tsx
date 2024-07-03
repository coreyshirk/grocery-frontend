import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/(app)/inventories/useOptimisticInventories";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { type Inventory, insertInventoryParams } from "@/lib/db/schema/inventories";
import {
  createInventoryAction,
  deleteInventoryAction,
  updateInventoryAction,
} from "@/lib/actions/inventories";
import { type Product, type ProductId } from "@/lib/db/schema/products";

const InventoryForm = ({
  products,
  productId,
  inventory,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  inventory?: Inventory | null;
  products: Product[];
  productId?: ProductId
  openModal?: (inventory?: Inventory) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Inventory>(insertInventoryParams);
  const editing = !!inventory?.id;
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("inventories");


  const onSuccess = (
    action: Action,
    data?: { error: string; values: Inventory },
  ) => {
    const failed = Boolean(data?.error);
    if (failed) {
      openModal && openModal(data?.values);
      toast.error(`Failed to ${action}`, {
        description: data?.error ?? "Error",
      });
    } else {
      router.refresh();
      postSuccess && postSuccess();
      toast.success(`Inventory ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const inventoryParsed = await insertInventoryParams.safeParseAsync({ productId, ...payload });
    if (!inventoryParsed.success) {
      setErrors(inventoryParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = inventoryParsed.data;
    const pendingInventory: Inventory = {
      updatedAt: inventory?.updatedAt ?? new Date().toISOString().slice(0, 19).replace("T", " "),
      createdAt: inventory?.createdAt ?? new Date().toISOString().slice(0, 19).replace("T", " "),
      id: inventory?.id ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: pendingInventory,
          action: editing ? "update" : "create",
        });

        const error = editing
          ? await updateInventoryAction({ ...values, id: inventory.id })
          : await createInventoryAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingInventory 
        };
        onSuccess(
          editing ? "update" : "create",
          error ? errorFormatted : undefined,
        );
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrors(e.flatten().fieldErrors);
      }
    }
  };

  return (
    <form action={handleSubmit} onChange={handleChange} className={"space-y-8"}>
      {/* Schema fields start */}
      
      {productId ? null : <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.productId ? "text-destructive" : "",
          )}
        >
          Product
        </Label>
        <Select defaultValue={inventory?.productId} name="productId">
          <SelectTrigger
            className={cn(errors?.productId ? "ring ring-destructive" : "")}
          >
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
          {products?.map((product) => (
            <SelectItem key={product.id} value={product.id.toString()}>
              {product.id}{/* TODO: Replace with a field from the product model */}
            </SelectItem>
           ))}
          </SelectContent>
        </Select>
        {errors?.productId ? (
          <p className="text-xs text-destructive mt-2">{errors.productId[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div> }
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.quantity ? "text-destructive" : "",
          )}
        >
          Quantity
        </Label>
        <Input
          type="text"
          name="quantity"
          className={cn(errors?.quantity ? "ring ring-destructive" : "")}
          defaultValue={inventory?.quantity ?? ""}
        />
        {errors?.quantity ? (
          <p className="text-xs text-destructive mt-2">{errors.quantity[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      {/* Schema fields end */}

      {/* Save Button */}
      <SaveButton errors={hasErrors} editing={editing} />

      {/* Delete Button */}
      {editing ? (
        <Button
          type="button"
          disabled={isDeleting || pending || hasErrors}
          variant={"destructive"}
          onClick={() => {
            setIsDeleting(true);
            closeModal && closeModal();
            startMutation(async () => {
              addOptimistic && addOptimistic({ action: "delete", data: inventory });
              const error = await deleteInventoryAction(inventory.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: inventory,
              };

              onSuccess("delete", error ? errorFormatted : undefined);
            });
          }}
        >
          Delet{isDeleting ? "ing..." : "e"}
        </Button>
      ) : null}
    </form>
  );
};

export default InventoryForm;

const SaveButton = ({
  editing,
  errors,
}: {
  editing: Boolean;
  errors: boolean;
}) => {
  const { pending } = useFormStatus();
  const isCreating = pending && editing === false;
  const isUpdating = pending && editing === true;
  return (
    <Button
      type="submit"
      className="mr-2"
      disabled={isCreating || isUpdating || errors}
      aria-disabled={isCreating || isUpdating || errors}
    >
      {editing
        ? `Sav${isUpdating ? "ing..." : "e"}`
        : `Creat${isCreating ? "ing..." : "e"}`}
    </Button>
  );
};
