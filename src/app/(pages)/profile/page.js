import JobSeekerLayout from "@/components/JobSeekerLayout";
import BasicInfoCard from "@/components/BasicInfoCard";
import { getUserDetailsAction } from "@/app/actions/userAction";

const getUserDetails = async () => {
  try {
    const result = await getUserDetailsAction();
    if (result?.error) {
      return { error: result.error };
    }
    return { user: result.user };
  } catch (error) {
    console.log(error);
  }
};

const page = async () => {
  const { user, error } = await getUserDetails();

  if (error) {
    return (
      <JobSeekerLayout>
        <div className="text-center text-red-600 text-lg mt-10">
          Error: {error}
        </div>
      </JobSeekerLayout>
    );
  }

  return (
    <JobSeekerLayout>
      <BasicInfoCard user={user} />
    </JobSeekerLayout>
  );
};

export default page;
