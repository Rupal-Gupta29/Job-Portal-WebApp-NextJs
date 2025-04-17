"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { linksSchema } from "@/utils/userSchema";
import { toast } from "react-toastify";
import { saveUserLinksAction } from "@/app/actions/userAction";
import { useState } from "react";

const ContactNLinksForm = ({user}) => {
  const [globalErrorMsg, setGlobalErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(linksSchema),
    defaultValues: {
      github: user.otherDetails?.github || "",
      linkedIn: user.otherDetails?.linkedIn || "",
    },
  });

  const onSubmit = async (data) => {
    setGlobalErrorMsg("");
    try {
      const response = await saveUserLinksAction(data);

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

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Contact & Links
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Github */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Github
          </label>
          <input
            type="text"
            {...register("github")}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
          />
          {errors.github && (
            <p className="mt-1 text-red-500 text-sm">{errors.github.message}</p>
          )}
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn
          </label>
          <input
            type="text"
            {...register("linkedIn")}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
          />
          {errors.linkedIn && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.linkedIn.message}
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

export default ContactNLinksForm;
