"use client";
import SignUpForm from "@/components/SignUpForm";
import SocialLoginForm from "@/components/SocialLoginForm";

const page = () => {
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create your account
            </h1>
            <SignUpForm />
            <SocialLoginForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
