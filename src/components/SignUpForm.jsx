import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/utils/authSchema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUserAction } from "@/app/actions/authActions";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const [globalErrorMsg, setGlobalErrorMsg] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    setGlobalErrorMsg("");
    try {
      const response = await registerUserAction(data);

      if (response?.success) {
        reset();
        toast.success(response.message);
        router.push("/auth/sign-in");
        return;
      }

      if (response?.errors) {
        Object.entries(response.errors).forEach(([field, message]) => {
          setError(field, {
            type: "server",
            message: message,
          });
        });
      }

      if (response?.error) {
        setGlobalErrorMsg(response.error);
      }
    } catch (error) {
      console.log(error.message);
      setGlobalErrorMsg("Something went wrong. Please try again later.");
    }
  };

  return (
    <form className="space-y-2 md:space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Username
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
          {...register("name")}
        />
        {errors?.name && (
          <p className="mt-2 text-red-600 text-sm">{errors?.name?.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
          {...register("email")}
        />
        {errors?.email && (
          <p className="mt-2 text-red-600 text-sm">{errors?.email?.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
          {...register("password")}
        />
        {errors?.password && (
          <p className="mt-2 text-red-600 text-sm">
            {errors?.password?.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
          {...register("confirmPassword")}
        />
        {errors?.confirmPassword && (
          <p className="mt-2 text-red-600 text-sm">
            {errors?.confirmPassword?.message}
          </p>
        )}
      </div>
      {globalErrorMsg && (
        <p className="mt-2 text-red-600 text-sm">{globalErrorMsg}</p>
      )}
      <button
        type="submit"
        className="w-full text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing up" : "Sign up"}
      </button>
      <p className="text-sm font-light text-gray-500">
        Already have an account yet?{" "}
        <a
          href="/auth/sign-in"
          className="font-medium text-primary-600 hover:underline"
        >
          Sign in
        </a>
      </p>
    </form>
  );
};

export default SignUpForm;
