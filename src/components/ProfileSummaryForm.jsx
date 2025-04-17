"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSummarySchema } from "@/utils/userSchema";
import { toast } from "react-toastify";
import { saveUserProfileSummaryAction } from "@/app/actions/userAction";
import { useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";

const ProfileSummaryForm = ({ user }) => {
  const [globalErrorMsg, setGlobalErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver(profileSummarySchema),
    defaultValues: {
      profileSummary: user.otherDetails?.profileSummary || "",
      keySkills: user.otherDetails?.keySkills || [],
    },
  });

  const keySkills = watch("keySkills");

  const onSubmit = async (data) => {
    setGlobalErrorMsg("");
    try {
      const response = await saveUserProfileSummaryAction(data);

      if (response?.success) {
        toast.success(response.message);
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
      console.log(error);
      setGlobalErrorMsg("Something went wrong. Please try again later.");
    }
  };

  const addSkill = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      const newSkill = e.target.value.trim().toLowerCase();
      const currentSkills = getValues("keySkills");
      if (!currentSkills.includes(newSkill)) {
        setValue("keySkills", [...keySkills, newSkill], {
          shouldValidate: true,
        });
      }
      e.target.value = "";
    }
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = keySkills.filter((skill) => skill !== skillToRemove);
    setValue("keySkills", updatedSkills, { shouldValidate: true });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Profile Summary & Skills
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Profile Summary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Summary
          </label>
          <textarea
            name="profileSummary"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("profileSummary")}
          ></textarea>
          {errors.profileSummary && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.profileSummary.message}
            </p>
          )}
        </div>

        {/* Key Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skills
          </label>

          {keySkills && keySkills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {keySkills.map((skill) => (
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

          {errors?.keySkills && (
            <p className="mt-1 text-red-500 text-sm">
              {errors?.keySkills?.message}
            </p>
          )}
        </div>

        {globalErrorMsg && (
          <p className="text-red-600 text-sm font-medium">{globalErrorMsg}</p>
        )}

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSummaryForm;
