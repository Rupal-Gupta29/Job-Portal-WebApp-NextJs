import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { formatJobType } from "@/utils/utilityMethods";

const JobDetailedPage = ({ job }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.jobTitle}</h1>
      <p className="text-gray-600 text-sm mb-4">
        {job.companyName} • {job.location}
      </p>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 border-y py-4">
        <span className="flex items-center gap-2">
          <FaBriefcase className="text-blue-600" />
          {formatJobType(job.jobType)}
        </span>
        <span className="flex items-center gap-2">
          <FaMoneyBillWave className="text-green-600" />
          {job.salary} LPA
        </span>
        <span className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-500" />
          Location: {job.location}
        </span>
        <span className="flex items-center gap-2">
          <FaCalendarAlt className="text-gray-500" />
          Posted on: {new Date(job.createdAt).toLocaleString()}
        </span>
      </div>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Job Description</h2>
        <p className="text-gray-800 leading-relaxed">{job.jobDescription}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Skills Required
        </h2>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-8 flex items-center gap-2 text-gray-700">
        <IoPeopleSharp className="text-xl text-blue-600" />
        <span>23 applicants</span>
      </section>

      <section className="mt-10 flex gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm transition">
          Apply Now
        </button>
        <button className="border border-gray-300 px-6 py-2 rounded-md text-sm hover:shadow">
          Save Job
        </button>
      </section>
    </div>
  );
};

export default JobDetailedPage;
