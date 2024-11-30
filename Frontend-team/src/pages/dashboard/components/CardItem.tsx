import logo1 from "../../../assets/images/logo1.png";
import logo2 from "../../../assets/images/logo2.png";
import logo3 from "../../../assets/images/logo3.png";
import Vector from "../../../assets/icons/Vector.png";
import ProjectCard from "@/components/ProjectCard";
// import diamond from "../../../assets/icons/diamond.png";

const CardItem = () => {
  interface Project {
    title: string;
    description: string;
    difficulty: string;
    technology: string[];
    icon: string;
  }
  const projects: Project[] = [
    {
      title: "DeFi Protocol Enhancement",
      description:
        "Help improve the security and scalability of a cutting-edge decentralized finance protocol...",
      difficulty: "Intermediate",
      technology: ["Solidity", "Defi", "Security"],
      icon: logo1,
    },
    {
      title: "DAO Governance Dashboard",
      description:
        "Develop a user-friendly interface for DAO members to vote, propose changes, and track...",
      difficulty: "Beginner",
      technology: ["React", "DAO", "Governance"],
      icon: logo2,
    },
    {
      title: "NFT Marketplace Expansion",
      description:
        "Contribute to the development of new features for a popular NFT marketplace. Enhance smart...",
      difficulty: "Expert",
      technology: ["Web3", "NFTs", "SmartContracts"],
      icon: logo3,
    },
  ];
  {
    /* Top Projects Recommended for You */
  }
  return (
    <div className=" p-6  ">
      <div className="flex  justify-between items-center">
        <h2 className="text-4xl font-semibold  mb-10 mr-4 ">
          Top Projects Recommended for You
        </h2>
        <p className="font-bold mb-10 ml-4 flex gap-2">
          View all projects{" "}
          <img
            src={Vector}
            alt=""
            className="w-[16px] h-[16px] p-[2.5px] pr-[4.5px] pl-[5.5px] mt-1"
          />
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3 max-sm:grid-cols-2 max-sm:gap-3">
        {projects.map((project, index) => (
          <ProjectCard project={project} key={index} />
        ))}
        {projects.map((project, index) => (
          <ProjectCard project={project} key={index} />
        ))}
      </div>

      {/* <div className="absolute bottom-0 right-0 transform  z-0">
        <img src={diamond} alt="" className="blur-3xl" />
      </div>
      <div className="absolute top-40 left-32 transform -translate-x-1/2 -translate-y-1/2 z-0">
        <img src={diamond} alt="" className="blur-xl" />
      </div> */}
    </div>
  );
};

export default CardItem;
