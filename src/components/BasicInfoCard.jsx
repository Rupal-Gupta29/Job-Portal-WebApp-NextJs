import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import EditModal from "./EditModal";
import BasicInfoForm from "./BasicInfoForm";

const BasicInfoCard = ({ user }) => {
  console.log("useerr", user);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row gap-6 items-center">
      {/* Profile Image + Progress */}
      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400">
        <img
          src="https://randomuser.me/api/portraits/women/68.jpg"
          alt="Profile"
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
          64%
        </div>
      </div>

      {/* Info Section */}
      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <EditModal>
            <BasicInfoForm />
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
            {user.otherDetails ? user.otherDetails.currentLocation : "Location"}
            ,{" "}
            {user.otherDetails
              ? user.otherDetails.country.toUpperCase()
              : "Country"}
          </div>
          <div className="flex items-center gap-2">
            <FiPhone />
            {user.otherDetails ? user.otherDetails.phone : "Phone"}
          </div>
          <div className="flex items-center gap-2">
            🎓{" "}
            {user.otherDetails
              ? user.otherDetails.experienceLevel
              : "Experience Level"}
          </div>
          <div className="flex items-center gap-2">
            <FiMail />
            {user.email}
            <FaCheckCircle className="text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoCard;
