import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/authSchema";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  console.log("errorss", errors);

  const onSubmit = async (data) => {
    console.log("data coming...", data);
  };
  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          {...register("email")}
        />
        {errors?.email && <p className="mt-2 text-red-600">{errors?.email?.message}</p>}
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
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          {...register("password")}
        />
        {errors?.password && (
          <p className="mt-2 text-red-600">{errors?.password?.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in" : "Sign in"}
      </button>
      <p className="text-sm font-light text-gray-500">
        Don’t have an account yet?{" "}
        <a href="#" className="font-medium text-primary-600 hover:underline">
          Sign up
        </a>
      </p>
    </form>
  );
};

export default SignInForm;
