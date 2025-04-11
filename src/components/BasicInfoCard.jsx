import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { PiGraduationCapDuotone } from "react-icons/pi";
import { GrLocationPin } from "react-icons/gr";
import { FaCheckCircle } from "react-icons/fa";
import EditModal from "./EditModal";
import BasicInfoForm from "./BasicInfoForm";

const BasicInfoCard = ({ user }) => {
  console.log("useerr", user);

  return (
    <div className="w-full bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row gap-6">
      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <EditModal>
            <BasicInfoForm user={user} />
          </EditModal>
        </div>
        <p className="text-sm text-gray-500">
          Profile created -{" "}
          <span className="font-medium">
            {new Date(user.createdAt).toDateString()}
          </span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-gray-700 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <FiMapPin />
            {user.otherDetails.currentLocation || "Location"},{" "}
            {user.otherDetails.country.toUpperCase() || "Country"}
          </div>
          <div className="flex items-center gap-2">
            <FiPhone />
            {user.otherDetails.phone || "Phone"}
          </div>
          <div className="flex items-center gap-2">
            <PiGraduationCapDuotone />{" "}
            {user.otherDetails.experienceLevel || "Experience Level"}
          </div>
          <div className="flex items-center gap-2">
            <FiMail />
            {user.email}
            <FaCheckCircle className="text-green-500" />
          </div>
          <div className="flex items-center gap-2">
            <GrLocationPin />
            <span>Preference: </span>
            {user.otherDetails.preferredLocation || "Preferred Location"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoCard;
