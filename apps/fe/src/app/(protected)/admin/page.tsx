import AllContestsPage from "../../../components/all-contests-page";
import SetupContest from "../../../components/create-contest/setup-contest";

const AdminPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ contest?: string }>;
}) => {
  const { contest } = await searchParams;

  if (contest && contest === "all") {
    return <AllContestsPage />;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <SetupContest contestId={contest!} />
    </div>
  );
};

export default AdminPage;
