import SideNavbar from "./SideNavbar";

const JobSeekerLayout = ({ children }) => {
  return (
    <div className="flex">
      <SideNavbar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default JobSeekerLayout;
