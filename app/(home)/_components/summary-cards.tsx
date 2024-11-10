import {
  WalletIcon,
  PiggyBank,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";

interface SummaryCards {
  month: string;
}

const SummaryCards = async ({ month }: SummaryCards) => {
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
  return (
    <div className="space-y-6">
      <SummaryCard
        amount={balance}
        icon={<WalletIcon size={16} />}
        title="Saldo"
        size="large"
      />
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          title="Investidos"
          amount={investmentsTd}
          icon={<PiggyBank size={16} />}
        />
        <SummaryCard
          title="Receita"
          amount={depositsTd}
          icon={<TrendingUpIcon size={16} className="text-primary" />}
        />
        <SummaryCard
          title="Despesas"
          amount={expensesTd}
          icon={<TrendingDownIcon size={16} className="text-danger" />}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
