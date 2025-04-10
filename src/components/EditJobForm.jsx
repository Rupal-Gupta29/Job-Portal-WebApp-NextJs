"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema } from "@/utils/jobSchema";
import { AiFillCloseSquare } from "react-icons/ai";
import { editJobAction } from "@/app/actions/jobActions";
import { toast } from "react-toastify";
import { useState } from "react";

const EditJobForm = ({ jobDetails, setModalIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
    getValues,
    watch,
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobTitle: jobDetails.jobTitle,
      companyName: jobDetails.companyName,
      location: jobDetails.location,
      salary: jobDetails.salary,
      minExperience: jobDetails.minExperience,
      jobType: jobDetails.jobType,
      jobDescription: jobDetails.jobDescription,
      skills: jobDetails.skills,
    },
  });

  const skills = watch("skills");
  const [globalErrorMsg, setGlobalErrorMsg] = useState("");

  const onSubmit = async (data) => {
    setGlobalErrorMsg("");
    try {
      const response = await editJobAction(jobDetails.id, data);

      if (response?.success) {
        toast.success(response.message);
        setModalIsOpen(false);
        return;
      }

      if (response?.error) {
        setGlobalErrorMsg(response.error);
      }

      if (response?.errors) {
        Object.entries(response.errors).forEach(([field, message]) => {
          setError(field, {
            type: "server",
            message: message,
          });
        });
      }
    } catch (error) {
      console.log(error.message);
      setGlobalErrorMsg("Something went wrong. Please try again later.");
    }
  };

  const addSkill = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      const newSkill = e.target.value.trim().toLowerCase();
      const currentSkills = getValues("skills");
      if (!currentSkills.includes(newSkill)) {
        setValue("skills", [...skills, newSkill], { shouldValidate: true });
      }
      e.target.value = "";
    }
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setValue("skills", updatedSkills, { shouldValidate: true });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <input
            type="text"
            name="jobTitle"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("jobTitle")}
          />
          {errors?.jobTitle && (
            <p className="mt-1 text-red-500 text-sm">
              {errors?.jobTitle?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("companyName")}
          />
          {errors?.companyName && (
            <p className="mt-1 text-red-500 text-sm">
              {errors?.companyName?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("location")}
          />
          {errors?.location && (
            <p className="mt-1 text-red-500 text-sm">
              {errors?.location?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Salary (in lpa)
          </label>
          <input
            type="text"
            name="salary"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("salary")}
          />
          {errors?.salary && (
            <p className="mt-1 text-red-500 text-sm">
              {errors?.salary?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Experience (in years)
          </label>
          <input
            type="number"
            name="minExperience"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("minExperience", { valueAsNumber: true })}
          />
          {errors?.minExperience && (
            <p className="mt-1 text-red-500 text-sm">
              {errors?.minExperience?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Type
          </label>
          <select
            name="jobType"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("jobType")}
          >
            <option value="FULL_TIME">Full-time</option>
            <option value="PART_TIME">Part-time</option>
            <option value="INTERNSHIP">Internship</option>
          </select>
          {errors?.jobType && (
            <p className="mt-1 text-red-500 text-sm">
              {errors?.jobType?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Description
          </label>
          <textarea
            name="jobDescription"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("jobDescription")}
          ></textarea>
          {errors?.jobDescription && (
            <p className="mt-1 text-red-500 text-sm">
              {errors?.jobDescription?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skills Required
          </label>

          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {skill}
                  <AiFillCloseSquare
                    className="cursor-pointer hover:text-red-600"
                    onClick={() => removeSkill(skill)}
                  />
                </div>
              ))}
            </div>
          )}

          <input
            type="text"
            placeholder="Type a skill and press Enter"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onKeyDown={addSkill}
          />

          {errors?.skills && (
            <p className="mt-1 text-red-500 text-sm">
              {errors?.skills?.message}
            </p>
          )}
        </div>

        {globalErrorMsg && (
          <p className="text-red-600 text-sm font-medium">{globalErrorMsg}</p>
        )}

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            onClick={() => setModalIsOpen(false)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJobForm;
