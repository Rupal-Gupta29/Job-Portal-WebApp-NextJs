"use client";
import { TbLogout } from "react-icons/tb";
import { logoutAction } from "@/app/actions/authActions";

const LogoutIconBtn = () => {
  return (
    <button className="text-3xl cursor-pointer" title="Logout">
      <TbLogout onClick={() => logoutAction()} />
    </button>
  );
};

export default LogoutIconBtn;
