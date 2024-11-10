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
        icon={<WalletIcon size={32} className="rounded-sm bg-[#100e0e] p-2" />}
        title="Saldo"
        size="large"
      />
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          title="Investidos"
          amount={investmentsTd}
          icon={
            <PiggyBank size={32} className="rounded-sm bg-[#ffffff1c] p-2" />
          }
          isInvestment
        />
        <SummaryCard
          title="Receita"
          amount={depositsTd}
          icon={
            <TrendingUpIcon
              size={32}
              className="rounded-sm bg-primary-opacited p-2 text-primary"
            />
          }
        />
        <SummaryCard
          title="Despesas"
          amount={expensesTd}
          icon={
            <TrendingDownIcon
              size={32}
              className="rounded-sm bg-danger bg-opacity-15 p-2 text-danger"
            />
          }
        />
      </div>
    </div>
  );
};

export default SummaryCards;
