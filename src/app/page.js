import { auth } from "@/auth";
import RecruiterDashboard from "@/components/RecruiterDashboard";
import JobSeekerDashboard from "@/components/JobSeekerDashboard";

export default async function Home() {
  const session = await auth();
  console.log("sss", session);

  return (
    <>
      {session?.user?.role === "RECRUITER" ? (
        <RecruiterDashboard />
      ) : (
        <JobSeekerDashboard />
      )}
    </>
  );
}
