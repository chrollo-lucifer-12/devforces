import LiveContests from "./live-contests";
import UpcomingContests from "./upcoming-contests";
const AllContestsPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 ">
      <div className="bg-muted/50 flex-1 rounded-xl  p-4 flex flex-col gap-2 overflow-hidden">
        <LiveContests />
        <UpcomingContests />
      </div>
    </div>
  );
};

export default AllContestsPage;
