import deleteTransaction from "@/app/_actions/delete-transaction";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { toast } from "sonner";

interface DeletTransactionDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (bool: boolean) => void;
  id: string;
}

const DeletTransactionDialog = ({
  id,
  isDialogOpen,
  setIsDialogOpen,
}: DeletTransactionDialogProps) => {
  const handleDeletTransaction = async () => {
    try {
      await deleteTransaction(id);
      setIsDialogOpen(false);
      toast.success("Transação deletada com sucesso!");
    } catch (error) {
      toast.error(`Não foi possível deletar a transação, erro: ${error}`);
    }
  };
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open);
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deseja deletar essa transação?</DialogTitle>
          <DialogDescription>
            Uma vez deletada não poderá recuperá-la
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            type="submit"
            onClick={handleDeletTransaction}
          >
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletTransactionDialog;
