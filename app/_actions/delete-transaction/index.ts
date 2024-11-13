"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

const deleteTransaction = async (id: string) => {
  await db.transaction.delete({
    where: {
      id,
    },
  });
  revalidatePath("/transactions");
};

export default deleteTransaction;
