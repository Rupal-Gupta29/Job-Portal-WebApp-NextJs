"use client";
import { IoPeopleSharp } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { deleteJobAction } from "@/app/actions/jobActions";
import { toast } from "react-toastify";
import EditJobModal from "./EditJobModal";

const RecruiterJobCard = ({ job }) => {
  const handleDeleteJob = async () => {
    try {
      let result = await deleteJobAction(job.id);
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      toast.success(result.message);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6 w-full max-w-2xl mx-auto space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">{job.jobTitle}</h3>
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
          {job.salary} lpa
        </span>
      </div>

      <div>
        {job.jobDescription.length > 70 ? (
          <p className="text-gray-800 text-sm">
            {job.jobDescription.slice(0, 70)}...
          </p>
        ) : (
          <p className="text-gray-800 text-sm">{job.jobDescription}</p>
        )}
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

      <div className="flex gap-4 mt-2">
        <EditJobModal jobDetails={job} />
        <button
          className="flex items-center gap-1 px-4 py-2 text-sm shadow-sm rounded-md border border-gray-200 hover:shadow-md transition cursor-pointer"
          onClick={handleDeleteJob}
        >
          <RiDeleteBin5Line className="text-base text-red-500" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecruiterJobCard;
