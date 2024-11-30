import CustomBtn from "@/components/CustomBtn";
import projectHookIcon from "../../../assets/icons/projectHookIcon.svg";
import ethIcon from "../../../assets/icons/ethIcon.svg";
import gitHubIcon from "../../../assets/icons/githubIcon.svg";
import CustomText from "./CustomText";
import team from "../../../assets/images/Team.png";
import nft from "../../../assets/images/nft.png";
import glassMan from "../../../assets/images/manGlass.png";
import coding from "../../../assets/images/coding.png";
import defi from "../../../assets/images/defi.png";

  /**
   * ProjectCategories component.
   *
   * This component renders a section on the landing page that allows users to explore different project categories.
   * It includes a title, a description, and a call-to-action button to connect to GitHub.
   * The component is responsive and scales according to the screen size.
   *
   * @returns {JSX.Element} The component JSX
   */
export default function ProjectCategories() {


  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      {/* <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div> */}
      <img src={projectHookIcon} alt="" className="mx-auto" />
      <div className="mb-12 flex items-center justify-center flex-col mt-3">
        <div className="relative">
          <CustomText text="Explore Project Categories" style={"text-5xl font-bold"} />
        </div>
        <div className="flex gap-5 mt-12">
          <CustomBtn text={"Connect to GitHub"} icon={gitHubIcon} colored="yes"/>
          <CustomBtn text={"Explore Projects"} icon={ethIcon} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 w-full">
  {/* {category.map((pic:any) => <img src={pic} alt="" className="" /> )} */}
  <img 
    src={coding} 
    alt="" 
    className="col-span-1 row-span-1 h-full object-cover rounded-3xl" 
  />
  <img 
    src={nft} 
    alt="" 
    className="col-span-1 row-span-1 sm:col-span-2 object-cover rounded-3xl" 
  />
  <img 
    src={glassMan} 
    alt="" 
    className="col-span-1 row-span-2 md:col-span-2 object-cover rounded-3xl" 
  />
  <img 
    src={defi} 
    alt="" 
    className="col-span-1 row-span-2 object-cover rounded-3xl" 
  />
  <img 
    src={team} 
    alt="" 
    className="col-span-1 row-span-2 sm:col-span-2 object-cover rounded-3xl" 
  />
</div>

      
    </section >
  );
}