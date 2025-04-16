import JobDetailedPage from "@/components/JobDetailedPage";
import { getJobDetailsById } from "@/app/actions/jobActions";

const getJobDetails = async (jobId) => {
  try {
    const result = await getJobDetailsById(jobId);
    if (result.error) {
      return { error: result.error };
    }
    return { job: result.job };
  } catch (error) {
    console.log("error", error);
  }
};

const page = async ({ params }) => {
  const { jobId } = await params;
  const { error, job } = await getJobDetails(jobId);

  if (error) {
    return (
      <div className="text-center text-red-600 text-lg mt-10">
        Error: {error}
      </div>
    );
  }
  return (
    <>
      <JobDetailedPage job={job} />
    </>
  );
};

export default page;
