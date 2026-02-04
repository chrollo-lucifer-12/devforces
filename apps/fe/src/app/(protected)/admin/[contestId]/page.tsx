import SetupContest from "../../../../components/create-contest/setup-contest";

const ContestPage = async ({
  params,
}: {
  params: Promise<{ contestId: string }>;
}) => {
  const { contestId } = await params;
  return (
    <div className="flex items-center justify-center h-screen">
      <SetupContest contestId={contestId} />
    </div>
  );
};

export default ContestPage;
