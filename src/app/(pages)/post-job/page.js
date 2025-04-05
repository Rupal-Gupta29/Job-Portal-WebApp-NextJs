import PostNewJobForm from "@/components/PostNewJobForm";
import Link from "next/link";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const page = () => {
  return (
    <>
      <div className="mb-6 flex justify-end p-6">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium text-sm"
        >
          <MdOutlineKeyboardBackspace className="text-lg mr-1" />
          Back to Dashboard
        </Link>
      </div>
      <PostNewJobForm />
    </>
  );
};

export default page;
