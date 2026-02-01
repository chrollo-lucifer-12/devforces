import { admin, eq } from "@repo/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../../lib/auth";
import { db } from "../../../lib/db";

const AdminPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.session || !session.user) {
    redirect("/auth/sign-in");
  }

  const userId = session.user.id;

  const checkAdmin = await db
    .select()
    .from(admin)
    .where(eq(admin.userId, userId));

  if (!checkAdmin) {
    redirect("/auth/sign-in");
  }

  return <div></div>;
};

export default AdminPage;
