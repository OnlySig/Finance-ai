"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { addTransactionSchema } from "./schema";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

interface AddTransactionProps {
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export const addTransaction = async (params: AddTransactionProps) => {
  addTransactionSchema.parse(params);
  const { userId } = await auth();
  if (!userId) throw new Error("Usuário não está logado!");
  await db.transaction.create({
    data: {
      ...params,
      userId,
    },
  });
  revalidatePath("/transactions");
};
