import actionUseUserId from "@/app/_hooks/actionUserId";
import { db } from "@/app/_lib/prisma";
import { endOfMonth, startOfMonth } from "date-fns";

const getMonthTransactions = async () => {
  const { userId } = await actionUseUserId();
  return (
    (await db.transaction.count({
      where: {
        userId,
        date: {
          gte: startOfMonth(new Date()),
          lt: endOfMonth(new Date()),
        },
      },
    })) + 1
  );
};

export default getMonthTransactions;
