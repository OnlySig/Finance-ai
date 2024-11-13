import { Button } from "@/app/_components/ui/button";
import UpsertTransactionDialog from "@/app/_components/upsert-transaction-dialog";
import { Transaction } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

interface EdiTtransactionButtonProps {
  transaction: Transaction;
}

const EditTransactionButton = ({ transaction }: EdiTtransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setDialogIsOpen(true)}
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
      >
        <PencilIcon />
      </Button>
      <UpsertTransactionDialog
        setIsOpen={setDialogIsOpen}
        isOpen={dialogIsOpen}
        defaultValues={{
          ...transaction,
          amount: Number(transaction.amount),
        }}
        transactionId={transaction.id}
      />
    </>
  );
};

export default EditTransactionButton;
