import AllContestsPage from "../../../components/all-contests-page";

const AdminPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ contest?: string; challenge?: string }>;
}) => {
  const { challenge, contest } = await searchParams;

  if (challenge && challenge === "all") {
    return null;
  }

  if (contest && contest === "all") {
    return <AllContestsPage />;
  }

  return null;
};

export default AdminPage;
