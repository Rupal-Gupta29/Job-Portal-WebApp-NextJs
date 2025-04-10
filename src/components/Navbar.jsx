import Link from "next/link";
import LogoutIconBtn from "./LogoutIconBtn";

const Navbar = async () => {
  return (
    <nav>
      <div className="flex justify-between py-2 px-6 items-center">
        <Link href={"/"} className="text-2xl font-semibold">
          Workify
        </Link>
        <LogoutIconBtn />
      </div>
    </nav>
  );
};

export default Navbar;
