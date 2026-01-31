import { auth } from "@repo/auth/auth";
import { prisma } from "@repo/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.session || !session.user) {
    redirect("/auth/sign-in");
  }

  const userId = session.user.id;

  const checkAdmin = await prisma.admin.findUnique({
    where: { userId },
  });

  if (!checkAdmin) {
    redirect("/auth/sign-in");
  }

  return <div></div>;
};

export default AdminPage;
