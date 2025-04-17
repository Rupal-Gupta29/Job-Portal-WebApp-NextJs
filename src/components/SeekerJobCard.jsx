import { IoPeopleSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import { formatJobType } from "@/utils/utilityMethods";
import ApplyNowBtn from "./ApplyNowBtn";
import { jobToApply } from "@/app/actions/jobActions";

const SeekerJobCard = ({ job }) => {
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
          {formatJobType(job.jobType)}
        </span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          {job.minExperience} years
        </span>
        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
          {job.salary} LPA
        </span>
      </div>

      <div>
        {job.jobDescription.length > 150 ? (
          <p className="text-gray-800 text-sm">
            {job.jobDescription.slice(0, 150)}...
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
              key={skill}
              className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-700 mt-2">
        <IoPeopleSharp className="text-lg text-blue-600" />
        <span>12 applicants</span>
      </div>

      <div className="flex gap-4 mt-2">
        <ApplyNowBtn
          jobId={job.id}
          jobToApply={jobToApply}
        />
        <Link
          href={`/job/${job.id}`}
          className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-md hover:shadow-sm transition"
        >
          <FaEye />
          View Details
        </Link>
      </div>
    </div>
  );
};

export default SeekerJobCard;
