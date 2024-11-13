import { Button } from "@/app/_components/ui/button";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import DeleteTransactionDialog from "./delete-transaction-dialog";

const DeleteTransactionButton = ({ id }: { id: string }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setIsDialogOpen(true)}
      >
        <TrashIcon />
      </Button>
      <DeleteTransactionDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        id={id}
      />
    </>
  );
};

export default DeleteTransactionButton;
