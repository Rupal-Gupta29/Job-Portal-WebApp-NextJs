import EditModal from "./EditModal";
import ProfileSummaryForm from "./ProfileSummaryForm";

const ProfileSummaryCard = ({ user }) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-md p-4">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Profile Summary & Skills
        </h2>
        <EditModal>
          <ProfileSummaryForm user={user} />
        </EditModal>
      </div>

      {/* Profile Summary */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 font-medium mb-1">
          Profile Summary
        </p>
        <p className="text-sm text-gray-800">
          {user.otherDetails?.profileSummary || "Write summary here..."}
        </p>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 font-medium mb-1">Skills</p>
        <div className="flex flex-wrap gap-2">
          {user.otherDetails?.keySkills &&
          user.otherDetails?.keySkills.length > 0 ? (
            user.otherDetails?.keySkills.map((skill) => (
              <span
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium"
                key={skill}
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-800">Add your skills here</p>
          )}
        </div>
      </div>

      {/* Resume */}
      <div>
        <p className="text-sm text-gray-600 font-medium mb-1">Resume</p>
        <a
          href="#"
          className="text-blue-600 text-sm hover:underline flex items-center gap-1"
        >
          {/* <FileText size={14} /> */}
          resume.pdf
        </a>
      </div>
    </div>
  );
};

export default ProfileSummaryCard;
