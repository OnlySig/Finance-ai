import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { Transactioncolumns } from "./_columns";
import AddTransactionButton from "../_components/addTransactionButton";
import NavBar from "../_components/navBar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import canUserTransaction from "../_data/can-user-transaction";

const TransactionsPage = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/login");
  const transactions = await db.transaction.findMany({
    where: {
      userId, //<-- shord-hand operator
    },
  });
  const canTransaction = await canUserTransaction();
  return (
    <>
      <NavBar />
      <div className="space-y-6 p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton canAddTransaction={canTransaction} />
        </div>
        <DataTable columns={Transactioncolumns} data={transactions} />
      </div>
    </>
  );
};

export default TransactionsPage;
