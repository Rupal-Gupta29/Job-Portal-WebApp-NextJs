import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SocialLoginForm = () => {
  return (
    <form>
      <button
        className="w-full text-gray-500 bg-transparent hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 text-center border border-violet-500 flex items-center justify-center gap-2"
        type="submit"
      >
        <FaGithub className="text-2xl" />
        <span> Sign in with GitHub</span>
      </button>
      <button
        className="w-full text-gray-500 bg-transparent hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 text-center border border-violet-500 flex items-center justify-center gap-2 mt-2"
        type="submit"
      >
        <FcGoogle className="text-2xl" />
        <span>Sign in with Google</span>
      </button>
    </form>
  );
};

export default SocialLoginForm;
