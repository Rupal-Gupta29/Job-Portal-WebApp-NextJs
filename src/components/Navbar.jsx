import Link from "next/link";
import LogoutIconBtn from "./LogoutIconBtn";
import { auth } from "@/auth";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav>
      {/* Navbar for larger devices */}
      <div className="flex justify-between py-2 px-6 items-center">
        <div>
          <Link href={"/"} className="text-2xl font-semibold">
            JobNest
          </Link>
        </div>
        {session && (
          <>
            <div className="sm:flex hidden gap-6">
              <Link href={"/"}>Home</Link>
              <Link href={"/"}>Jobs</Link>
              <Link href={"/"}>Profile</Link>
            </div>
            <div>
              <LogoutIconBtn />
            </div>
          </>
        )}
      </div>

      {/* Navbar for smaller devices */}

      {session && (
        <div className="flex gap-6 justify-center sm:hidden">
          <Link href={"/"}>Home</Link>
          <Link href={"/"}>Jobs</Link>
          <Link href={"/"}>Profile</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
