"use client";
import { TbLogout } from "react-icons/tb";
import { logoutAction } from "@/app/actions/authActions";

const LogoutIconBtn = () => {
  return (
    <button
      className="flex items-center gap-1 border border-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded text-sm px-4 py-2 text-center cursor-pointer"
      onClick={() => logoutAction()}
    >
      <TbLogout className="text-2xl text-gray-600" /> Logout
    </button>
  );
};

export default LogoutIconBtn;
