import { getPostedJobsByRecruiter } from "@/app/actions/jobActions";
import RecruiterJobCard from "./RecruiterJobCard";

const getJobs = async () => {
  try {
    const result = await getPostedJobsByRecruiter();
    if (result.error) {
      return { error: result.error };
    }
    return { jobs: result.jobs };
  } catch (error) {
    console.log(error);
  }
};

const PostedJobs = async () => {
  const { error, jobs } = await getJobs();

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
    <div className="grid grid-cols-4 gap-4 px-6 mt-6">
      {jobs.map((job) => (
        <RecruiterJobCard job={job} key={job.id} />
      ))}
    </div>
  );
};

export default PostedJobs;
