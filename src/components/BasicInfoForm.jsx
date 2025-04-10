"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { basicInfoSchema } from "@/utils/userSchema";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { saveUserBasicInfoAction } from "@/app/actions/userAction";
import { useState } from "react";

const BasicInfoForm = () => {
  const router = useRouter();
  const [globalErrorMsg, setGlobalErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(basicInfoSchema),
  });

  const onSubmit = async (data) => {
    setGlobalErrorMsg("");
    try {
      const response = await saveUserBasicInfoAction(data);

      if (response?.success) {
        toast.success(response.message);
        reset();
        router.push("/");
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

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Basic Information
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Current Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Location
          </label>
          <input
            type="text"
            {...register("currentLocation")}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
          />
          {errors.currentLocation && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.currentLocation.message}
            </p>
          )}
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Experience Level
          </label>
          <select
            {...register("experienceLevel")}
            defaultValue=""
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
          >
            <option value="" disabled>
              Select experience level
            </option>
            <option value="Fresher">Fresher</option>
            <option value="Experienced">Experienced</option>
          </select>
          {errors.experienceLevel && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.experienceLevel.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="text"
            {...register("phone")}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
          />
          {errors.phone && (
            <p className="mt-1 text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <input
            type="text"
            {...register("country")}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
          />
          {errors.country && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.country.message}
            </p>
          )}
        </div>

        {/* Preferred Location (Optional) */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Location
          </label>
          <input
            type="text"
            {...register("preferredLocation")}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
          />
          {errors.preferredLocation && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.preferredLocation.message}
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

export default BasicInfoForm;
