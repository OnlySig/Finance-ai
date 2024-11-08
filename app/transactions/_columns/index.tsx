"use client";
import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import TransactionTypeBadge from "../_components/type-badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const Transactioncolumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => (
      <TransactionTypeBadge transaction={transaction} />
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "paymentMethod",
    header: "Métudo de pagamento",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: "Valor",
  },
  {
    accessorKey: "actions",
    header: "",
  },
];
