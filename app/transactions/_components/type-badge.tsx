import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface TransactionProps {
  transaction: Transaction;
}

const TransactionTypeBadge = ({ transaction }: TransactionProps) => {
  if (transaction.type === TransactionType.DEPOSIT)
    return (
      <Badge className="bg-primary-opacited font-bold text-primary hover:bg-muted">
        <CircleIcon className="mr-2 size-2 fill-primary" />
        Depósito
      </Badge>
    );
  if (transaction.type === TransactionType.EXPENSE)
    return (
      <Badge className="bg-danger bg-opacity-10 font-bold text-danger hover:bg-muted">
        <CircleIcon className="mr-2 size-2 fill-danger" />
        Despesa
      </Badge>
    );
  return (
    <Badge className="bg-white bg-opacity-10 font-bold text-white hover:bg-muted">
      <CircleIcon className="mr-2 size-2 fill-white" />
      Investimento
    </Badge>
  );
};

export default TransactionTypeBadge;
