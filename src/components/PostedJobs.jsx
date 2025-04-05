import { getPostedJobsByRecruiter } from "@/app/actions/jobActions";
import { IoPeopleSharp } from "react-icons/io5";

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

  console.log("jobssss", jobs);

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
    <div>
      {jobs.map((job) => (
        <div
          className="bg-white shadow-md rounded-xl border border-gray-200 p-6 w-full max-w-2xl mx-auto space-y-4"
          key={job.id}
        >
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {job.jobTitle}
            </h3>
            <p className="text-sm text-gray-600">
              {job.companyName} • {job.location}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {job.jobType}
            </span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              {job.minExperience} years
            </span>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
              {job.salary}
            </span>
          </div>

          <div>
            <p className="text-gray-800 text-sm">{job.jobDescription}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Skills:</p>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
                  key={skill}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700 mt-2">
            <IoPeopleSharp className="text-lg text-blue-600" />
            <span>8 applicants</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostedJobs;
