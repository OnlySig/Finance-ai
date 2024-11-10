import { TransactionType } from "@prisma/client";

export type PercentagePerType = {
  [key in TransactionType]: number;
};
