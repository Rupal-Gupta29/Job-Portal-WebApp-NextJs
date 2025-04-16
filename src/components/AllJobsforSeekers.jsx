import { getAllJobsForSeekersAction } from "@/app/actions/jobActions";
import SeekerJobCard from "./SeekerJobCard";

const getAllJobs = async () => {
  try {
    const result = await getAllJobsForSeekersAction();
    if (result.error) {
      return { error: result.error };
    }
    return { jobs: result.jobs };
  } catch (error) {
    console.log(error);
  }
};

const AllJobsforSeekers = async () => {
  const { error, jobs } = await getAllJobs();

  if (error) {
    return (
      <div className="text-center text-red-600 text-lg mt-10">
        Error: {error}
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center text-gray-600 text-lg mt-10">
        No jobs found.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-4 px-6 mt-6">
      {jobs.map((job) => (
        <SeekerJobCard job={job} key={job.id} />
      ))}
    </div>
  );
};

export default AllJobsforSeekers;
