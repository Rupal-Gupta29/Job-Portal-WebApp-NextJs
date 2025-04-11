import JobSeekerLayout from "@/components/JobSeekerLayout";
import BasicInfoCard from "@/components/BasicInfoCard";
import { getUserDetailsAction } from "@/app/actions/userAction";
import ProfileSummaryCard from "@/components/ProfileSummaryCard";

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
      <div className="flex flex-col gap-4 items-center w-full max-w-5xl mx-auto px-4">
        <BasicInfoCard user={user} />
        <ProfileSummaryCard user={user} />
      </div>
    </JobSeekerLayout>
  );
};

export default page;
