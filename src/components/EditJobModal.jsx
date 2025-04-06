"use client";
import { useState } from "react";
import EditJobForm from "./EditJobForm";
import { GrEdit } from "react-icons/gr";

const EditJobModal = ({ jobDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 px-4 py-2 text-sm shadow-sm rounded-md border border-gray-200 hover:shadow-md transition cursor-pointer"
        type="button"
      >
        <GrEdit className="text-base text-yellow-500" />
        Edit
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm overflow-y-auto py-10">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto relative">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Edit Job Details
              </h3>
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

            <div className="p-4">
              <EditJobForm jobDetails={jobDetails} setModalIsOpen={setIsOpen} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditJobModal;
