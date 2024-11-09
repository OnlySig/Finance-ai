"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { upsertTransactionSchema } from "./schema";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

interface upsertTransactionProps {
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
  id?: string;
}

export const upsertTransaction = async (params: upsertTransactionProps) => {
  upsertTransactionSchema.parse(params);
  const { userId } = await auth();
  if (!userId) throw new Error("Usuário não está logado!");
  await db.transaction.upsert({
    where: {
      id: params.id,
    },
    update: { ...params, userId },
    create: { ...params, userId },
  });
  revalidatePath("/transactions");
};
