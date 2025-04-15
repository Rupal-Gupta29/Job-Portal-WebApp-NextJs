"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalDetailsSchema } from "@/utils/userSchema";
import { toast } from "react-toastify";
import { saveUserPersonalInfoAction } from "@/app/actions/userAction";
import { useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";

const PersonalDetailsForm = ({ user }) => {
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
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      gender: user.otherDetails.gender || "",
      dob: user.otherDetails.dob || "",
      permanentAddress: user.otherDetails.permanentAddress || "",
      languageSpoken: user.otherDetails.languageSpoken || [],
    },
  });

  const languageSpoken = watch("languageSpoken");

  const onSubmit = async (data) => {
    setGlobalErrorMsg("");
    try {
      const response = await saveUserPersonalInfoAction(data);

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

  const addLanguage = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      const newLanguage = e.target.value.trim().toLowerCase();
      const currentLanguages = getValues("languageSpoken");
      if (!currentLanguages.includes(newLanguage)) {
        setValue("languageSpoken", [...languageSpoken, newLanguage], {
          shouldValidate: true,
        });
      }
      e.target.value = "";
    }
  };

  const removeLanguage = (languageToRemove) => {
    const updatedLanguages = languageSpoken.filter(
      (language) => language !== languageToRemove
    );
    setValue("languageSpoken", updatedLanguages, { shouldValidate: true });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Personal Details
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            {...register("gender")}
            defaultValue=""
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-red-500 text-sm">{errors.gender.message}</p>
          )}
        </div>

        {/* DOB */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            DOB
          </label>
          <input
            type="date"
            {...register("dob")}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
          />
          {errors.dob && (
            <p className="mt-1 text-red-500 text-sm">{errors.dob.message}</p>
          )}
        </div>

        {/* Permanent Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Permanent Address
          </label>
          <input
            type="text"
            {...register("permanentAddress")}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
          />
          {errors.permanentAddress && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.permanentAddress.message}
            </p>
          )}
        </div>

        {/* Language Spoken */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Languages
          </label>

          {languageSpoken && languageSpoken.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {languageSpoken.map((language) => (
                <div
                  key={language}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {language}
                  <AiFillCloseSquare
                    className="cursor-pointer hover:text-red-600"
                    onClick={() => removeLanguage(language)}
                  />
                </div>
              ))}
            </div>
          )}

          <input
            type="text"
            placeholder="Type a language and press Enter"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onKeyDown={addLanguage}
          />

          {errors?.languageSpoken && (
            <p className="mt-1 text-red-500 text-sm">
              {errors?.languageSpoken?.message}
            </p>
          )}
        </div>

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

export default PersonalDetailsForm;
