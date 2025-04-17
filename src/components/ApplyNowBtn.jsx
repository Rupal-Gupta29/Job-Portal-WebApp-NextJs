"use client";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const ApplyNowBtn = ({ jobId, jobToApply }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleApplyNow = async () => {
    const result = await jobToApply(jobId);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.error);
    }
  };

  return (
    <button
      onClick={handleApplyNow}
      className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
    >
      <FaPaperPlane />
      Apply Now
    </button>
  );
};

export default ApplyNowBtn;
