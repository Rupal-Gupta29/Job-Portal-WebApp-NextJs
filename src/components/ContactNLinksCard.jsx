import { FaGithub, FaLinkedin } from "react-icons/fa";
import EditModal from "./EditModal";
import ContactNLinksForm from "./ContactNLinksForm";
import Link from "next/link";

const ContactNLinksCard = ({ user }) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-md p-4">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-xl font-semibold text-gray-800">Contact & Links</h2>
        <EditModal>
          <ContactNLinksForm user={user} />
        </EditModal>
      </div>

      <div className="flex gap-6 text-blue-600 text-sm items-center">
        <Link
          href={user.otherDetails?.github || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline"
        >
          <FaGithub className="text-xl text-gray-700" />
          {user.otherDetails?.github || "github.com/yourusername"}
        </Link>

        <Link
          href={user.otherDetails?.linkedIn || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline"
    
        >
          <FaLinkedin className="text-xl text-blue-700" />
          {user.otherDetails?.linkedIn || "linkedin.com/in/yourusername"}
        </Link>
      </div>
    </div>
  );
};

export default ContactNLinksCard;
