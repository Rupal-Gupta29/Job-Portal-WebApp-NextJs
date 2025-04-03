import Link from "next/link";
import { IoMdAdd } from "react-icons/io";

const AddJob = () => {
  return (
    <div>
      <Link
        href="/post-job"
        className="flex items-center gap-1 border border-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded text-sm px-4 py-2 text-center cursor-pointer"
      >
        <IoMdAdd className="text-2xl text-gray-600" />
        Post Job
      </Link>
    </div>
  );
};

export default AddJob;
