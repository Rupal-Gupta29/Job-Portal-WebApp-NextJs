import {
  FaCalendarAlt,
  FaVenusMars,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";
import EditModal from "./EditModal";
import PersonalDetailsForm from "./PersonalDetailsForm";

const PersonalDetailsCard = ({ user }) => {
  return (
    <div className="bg-white mt-4 w-full bg-white rounded-xl shadow-md p-4">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-xl font-semibold">Personal Details</h2>
        <EditModal>
          <PersonalDetailsForm user={user} />
        </EditModal>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-gray-500" />
          <span>
            <strong>DOB:</strong> {user.otherDetails?.dob || "Your DOB here"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <FaVenusMars className="text-gray-500" />
          <span>
            <strong>Gender:</strong>{" "}
            {user.otherDetails?.gender || "Choose your gender"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-gray-500" />
          <span>
            <strong>Address:</strong>{" "}
            {user.otherDetails?.permanentAddress || "Add your permanent address"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <FaGlobe className="text-gray-500" />
          <span>
            <strong>Languages:</strong>{" "}
            {user.otherDetails?.languageSpoken &&
            user.otherDetails?.languageSpoken.length > 0
              ? user.otherDetails.languageSpoken.map((language) => (
                  <span
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium"
                    key={language}
                  >
                    {language}
                  </span>
                ))
              : "Add languages here"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsCard;
