import { logger } from "../../../lib/logger";

const log = logger.child({ module: "totoro" });

const AdminPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ contest?: string; challenge?: string }>;
}) => {
  const { challenge, contest } = await searchParams;

  if (challenge) {
    return null;
  }

  if (contest) {
    return null;
  }

  return <div className=""></div>;
};

export default AdminPage;
