"use client";
import { useState } from "react";
import { GrEdit } from "react-icons/gr";

const EditModal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <GrEdit
        className="text-base text-yellow-500 cursor-pointer"
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm overflow-y-auto py-10">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto relative">
            <div className="flex items-center justify-end p-2 border-gray-200 rounded-t">
              {/* {Modal heading} */}
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="text-gray-400 hover:text-gray-900 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;
