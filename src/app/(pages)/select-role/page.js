"use client";

import { useForm } from "react-hook-form";
import { selectUserRoleAction } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm();
  const selectedRole = watch("role");
  const [globalErrorMsg, setGlobalErrorMsg] = useState("");

  const onSubmit = async (data) => {
    setGlobalErrorMsg("");
    try {
      const response = await selectUserRoleAction(data);
      console.log("responses", response);
      if (!response.success) {
        setGlobalErrorMsg(response.error);
      } else if (response.success) {
        toast.success(response.message);
        console.log("before router.push");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setGlobalErrorMsg("Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form
        className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="mb-5 text-lg font-medium text-gray-900 text-center">
          Select your role:
        </h3>
        <ul className="grid w-full gap-6 md:grid-cols-2">
          <li>
            <input
              type="radio"
              id="recruiter"
              value="recruiter"
              className="hidden peer"
              {...register("role", { required: true })}
            />
            <label
              htmlFor="recruiter"
              className="flex flex-col items-center justify-center w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-violet-500 peer-checked:bg-violet-100 peer-checked:text-violet-700"
            >
              <div className="text-lg font-semibold">Recruiter</div>
              <div className="text-sm">Post jobs and manage applicants</div>
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="job-seeker"
              value="job-seeker"
              className="hidden peer"
              {...register("role", { required: true })}
            />
            <label
              htmlFor="job-seeker"
              className="flex flex-col items-center justify-center w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-violet-500 peer-checked:bg-violet-100 peer-checked:text-violet-700"
            >
              <div className="text-lg font-semibold">Job Seeker</div>
              <div className="text-sm">Browse jobs and apply for positions</div>
            </label>
          </li>
        </ul>
        {globalErrorMsg && (
          <p className="mt-2 text-red-600 text-sm text-center">
            {globalErrorMsg}
          </p>
        )}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className={`px-6 py-2 text-white rounded-lg ${
              selectedRole
                ? "bg-violet-600 hover:bg-violet-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!selectedRole}
          >
            Select
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
