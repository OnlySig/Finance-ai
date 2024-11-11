import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TRANSACTION_PAYMENTMETHOD_ICON } from "@/app/_constants/transactions";
import { currency } from "@/app/_utils/currency";
import { Transaction, TransactionType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface LastTransactionsProps {
  lastTransactions: Transaction[];
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  const getTypeColor = (transaction: Transaction) => {
    if (transaction.type === TransactionType.DEPOSIT) return "text-primary";
    if (transaction.type === TransactionType.EXPENSE) return "text-danger";
    if (transaction.type === TransactionType.INVESTMENT) return "text-white";
  };
  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Últimas Transações</CardTitle>
        <Button variant="outline" className="rounded-full font-bold" asChild>
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {lastTransactions.map((transaction) => (
          <div
            className="flex items-center justify-between"
            key={transaction.id}
          >
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-white bg-opacity-[6%] p-2">
                <Image
                  src={
                    TRANSACTION_PAYMENTMETHOD_ICON[transaction.paymentMethod]
                  }
                  height={20}
                  width={20}
                  alt={`imagem da transaçao ${transaction.name}`}
                />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-bold">{transaction.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className={`text-sm font-bold ${getTypeColor(transaction)}`}>
              <p>
                {transaction.type === "DEPOSIT" ? "+" : "-"}
                {currency(Number(transaction.amount))}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default LastTransactions;
