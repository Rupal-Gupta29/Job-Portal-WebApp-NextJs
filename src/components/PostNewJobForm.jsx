"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema } from "@/utils/jobSchema";
import { AiFillCloseSquare } from "react-icons/ai";
import { postJobAction } from "@/app/actions/jobActions";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PostNewJobForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    setValue,
    getValues,
    watch,
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: { skills: [] },
  });

  const skills = watch("skills");
  const [globalErrorMsg, setGlobalErrorMsg] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    setGlobalErrorMsg("");
    try {
      const response = await postJobAction(data);

      if (response?.success) {
        toast.success(response.message);
        router.push("/");
        return
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
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Post a New Job
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            name="jobTitle"
            className="w-full p-2 border rounded-md mt-2"
            {...register("jobTitle")}
          />
          {errors?.jobTitle && (
            <p className="mt-2 text-red-600 text-sm">
              {errors?.jobTitle?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            className="w-full p-2 border rounded-md mt-2"
            {...register("companyName")}
          />
          {errors?.companyName && (
            <p className="mt-2 text-red-600 text-sm">
              {errors?.companyName?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            className="w-full p-2 border rounded-md mt-2"
            {...register("location")}
          />
          {errors?.location && (
            <p className="mt-2 text-red-600 text-sm">
              {errors?.location?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Salary
          </label>
          <input
            type="text"
            name="salary"
            className="w-full p-2 border rounded-md mt-2"
            {...register("salary")}
          />
          {errors?.salary && (
            <p className="mt-2 text-red-600 text-sm">
              {errors?.salary?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Minimum Experience
          </label>
          <input
            type="number"
            name="minExperience"
            className="w-full p-2 border rounded-md mt-2"
            {...register("minExperience", { valueAsNumber: true })}
          />
          {errors?.minExperience && (
            <p className="mt-2 text-red-600 text-sm">
              {errors?.minExperience?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Type
          </label>
          <select
            name="jobType"
            className="w-full p-2 border rounded-md mt-2"
            {...register("jobType")}
          >
            <option value="FULL_TIME">Full-time</option>
            <option value="PART_TIME">Part-time</option>
            <option value="INTERNSHIP">Internship</option>
          </select>
          {errors?.jobType && (
            <p className="mt-2 text-red-600 text-sm">
              {errors?.jobType?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <textarea
            name="jobDescription"
            rows="3"
            className="w-full p-2 border rounded-md mt-2"
            {...register("jobDescription")}
          ></textarea>
          {errors?.jobDescription && (
            <p className="mt-2 text-red-600 text-sm">
              {errors?.jobDescription?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Skills Required
          </label>
          {skills && skills.length > 0 && (
            <div className="w-full p-2 mt-2 flex gap-2">
              {skills.map((skill) => (
                <div
                  className="bg-blue-600 text-white flex gap-1 items-center p-1 rounded"
                  key={skill}
                >
                  {skill}
                  <span>
                    <AiFillCloseSquare
                      className="cursor-pointer"
                      onClick={(e) => removeSkill(skill)}
                    />
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="w-full p-2 border rounded-md mt-2">
            <input
              type="text"
              placeholder="Type a skill and press Enter"
              className="w-full p-1 rounded-md"
              onKeyDown={addSkill}
            />
          </div>

          {errors?.skills && (
            <p className="mt-2 text-red-600 text-sm">
              {errors?.skills?.message}
            </p>
          )}
        </div>

        {globalErrorMsg && (
          <p className="mt-2 text-red-600 text-sm">{globalErrorMsg}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Posting" : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default PostNewJobForm;
