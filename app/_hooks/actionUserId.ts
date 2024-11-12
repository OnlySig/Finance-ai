import { auth } from "@clerk/nextjs/server";

const actionUseUserId = async () => {
  const { userId } = await auth();
  return userId;
};

export default actionUseUserId;
