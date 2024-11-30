import image23 from "../../../assets/images/image21.png";
import Vector from "../../../assets/icons/Vector.png";
// import diamond from "../../../assets/icons/diamond.png";
// import diamondBlur from "../../../assets/icons/diamondBlur.svg";

const Dashboard = () => {
  return (
    <div className=" text-white min-h-screen relative max-sm:py-28 max-sm:px-2  p-28 grid gap6 max-sm:gap-3">
      <div className="grid gap-6 md:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-3">
        {/* My Projects Section */}
        <div className="bg-gray-800 p-1 border border-customBlue  sm:p-4 md:p-8   top-[139px] gap-[24px] rounded-[24px] border-t-[1px]  ">
          <div className="flex justify-between items-center">
            <h2 className="sm:text-lg lg:text-xl text-lg  font-semibold ">
              My Projects
            </h2>
            <p className="  flex gap-2">
              View all project
              <img
                src={Vector}
                alt=""
                className="w-[16px] h-[16px] p-[2.5px] pr-[4.5px] pl-[5.5px] mt-1   "
              />
            </p>
          </div>
          <p className="mt-4 text-sm sm:text-base lg:text-lg font-matter text-[18px] font-normal color-gray-400 text-left ">
            Here's an overview of your active, pending and completed projects.
          </p>
          <div className="p-8 sm:p-6">
            <hr className="border-t-[1px] border-[#293056] w-full" />
          </div>

          <div className=" mt-6 flex flex-col   items-center justify-center  h-40">
            <img
              src={image23}
              alt="No projects"
              className="  mt-32 max-sm:mt-0"
            />

            <p className="text-[18px] font-medium text-center mt-8 p-2  max-sm:mt-0">
              Nothing to see...
            </p>
            <p className="text-gray-500 text-sm p-2">
              No contributions have been made yet.
            </p>
          </div>
        </div>

        {/* Contribution History Section */}
        <div className=" bg-gray-800  p-1 border border-customBlue sm:p-6 md:p-8  top-[139px]  gap-[24px] rounded-[24px]">
          <div className="flex justify-between items-center">
            <h2 className=" sm:text-lg lg:text-xl text-lg font-semibold">
              Contributor History
            </h2>
            <p className=" text-sm sm:text-base flex gap-2">
              View all Contributors{" "}
              <img
                src={Vector}
                alt=""
                className="w-[16px] h-[16px] p-[2.5px] pr-[4.5px] pl-[5.5px] mt-1"
              />
            </p>
          </div>
          <p className="mt-4 font-matter text-[18px] font-normal color-gray-400 text-left text-sm sm:text-base lg:text-lg">
            Here's an overview of your completed tasks, pull requests & commits.
          </p>
          <div className="p-8 sm:p-6">
            <hr className="border-t-[1px] border-[#293056] w-full" />
          </div>
          <div className="mt-6 flex flex-col items-center justify-center h-40">
            <img
              src={image23}
              alt="No projects"
              className="  mt-32 max-sm:mt-0"
            />

            <p className="text-[18px] font-medium text-center mt-8 p-2  max-sm:mt-0">
              Nothing to see...
            </p>
            <p className="text-gray-500 text-sm p-2">
              No contributions have been made yet.
            </p>
          </div>
        </div>

        {/* <div className="absolute bottom-0 right-0 transform  z-0">
          <img src={diamond} alt="" className="blur-3xl" />
        </div> */}
        {/* <div className="absolute top-40 left-32 z-index-0">
          <img src={diamond} alt="" className="blur-xl" />
        </div> */}
        {/* <div className="absolute top-10 left-10 -z-10 hidden md:block">
          <img
            src={diamondBlur}
            alt="Decorative diamond blur"
            className="rotate-45 w-56"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
