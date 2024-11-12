import AddTransactionButton from "@/app/_components/addTransactionButton";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import canUserTransaction from "@/app/_data/can-user-transaction";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  isInvestment?: boolean;
}

const SummaryCard = async ({
  icon,
  title,
  amount,
  size = "small",
  isInvestment = false,
}: SummaryCardProps) => {
  const canTransaction = await canUserTransaction();
  return (
    <>
      <Card
        className={`${(size === "large" && "bg-[#161716]") || (isInvestment && "bg-[#141414]")}`}
      >
        <CardHeader className="flex gap-2">
          <div className="flex items-center gap-2">
            {icon}
            <p
              className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
            >
              {title}
            </p>
          </div>
        </CardHeader>
        <CardContent className="flex justify-between">
          <p
            className={`${size === "small" ? "text-2xl font-bold" : "text-4xl font-bold"}`}
          >
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(amount)}
          </p>

          {size === "large" && (
            <AddTransactionButton canAddTransaction={canTransaction} />
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default SummaryCard;
