import actionUseUserId from "@/app/_hooks/actionUserId";
import getMonthTransactions from "../get-count-transactions";

const canUserTransaction = async () => {
  const { user } = await actionUseUserId();
  if (user.publicMetadata.subscriptionPlan === "pro") return true;
  const getMonth = await getMonthTransactions();
  if (getMonth >= 10) return false;
  console.log(getMonth);
  return true;
};

export default canUserTransaction;
