import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { PercentagePerType } from "./types";

const getDashboard = async (month: string) => {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  };
  const investmentsTd = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const expensesTd = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const depositsTd = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const balance = depositsTd - investmentsTd - expensesTd;
  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  );
  const typesPercentage: PercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTd || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTd || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investmentsTd || 0) / Number(transactionsTotal)) * 100,
    ),
  };

  return {
    balance,
    investmentsTd,
    expensesTd,
    depositsTd,
    typesPercentage,
  };
};

export default getDashboard;
