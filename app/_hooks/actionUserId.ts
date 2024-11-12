import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const actionUseUserId = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/login");
  const user = await clerkClient().users.getUser(userId);
  return { userId, user };
};

export default actionUseUserId;
