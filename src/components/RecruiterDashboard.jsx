import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import PostedJobs from "./PostedJobs";

const RecruiterDashboard = () => {
  return (
    <div className="mt-6">
      <div className="flex justify-between px-4">
        <h1 className="text-2xl font-semibold text-gray-800">Jobs Posted</h1>
        <Link
          href="/post-job"
          className="flex gap-1 items-center text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded text-sm px-4 py-2 text-center"
        >
          <AiOutlinePlus className="font-medium text-xl" />
          Post New Job
        </Link>
      </div>
      <PostedJobs />
    </div>
  );
};

export default RecruiterDashboard;
