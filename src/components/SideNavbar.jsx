"use client";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { GrSearch } from "react-icons/gr";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-white text-gray-800 p-4 flex items-center justify-between border-b shadow-sm">
        <button onClick={() => setIsOpen(true)}>
          <MdMenu size={26} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 z-50 md:z-auto h-screen w-64 bg-white text-gray-900 border-r border-gray-200 shadow-xl transform transition-transform duration-300 rounded-r-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Close Button - only on mobile */}
        <div className="md:hidden flex justify-end p-4 border-b">
          <button onClick={() => setIsOpen(false)}>
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="p-4 md:pt-6">
          <nav className="space-y-2">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-blue-100 transition font-medium"
            >
              <AiOutlineHome size={20} className="text-blue-500" />
              Home
            </Link>
            <Link
              href="/jobs"
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-blue-100 transition font-medium"
            >
              <GrSearch size={20} className="text-blue-500" />
              Browse
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-blue-100 transition font-medium"
            >
              <FiUser size={20} className="text-blue-500" />
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
