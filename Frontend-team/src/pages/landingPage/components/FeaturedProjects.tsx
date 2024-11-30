import logo1 from "../../../assets/images/logo1.png";
import logo2 from "../../../assets/images/logo2.png";
import logo3 from "../../../assets/images/logo3.png";
import diamondBlur from "../../../assets/icons/diamondBlur.svg";
import diamond from "../../../assets/icons/diamond.png";
import featureIcon from "../../../assets/icons/feature.svg";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import CustomText from "./CustomText";

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
    description: "Help improve the security and scalability of a cutting-edge decentralized finance protocol...",
    difficulty: "Intermediate",
    technology: ["Solidity", "Defi", "Security"],
    icon: logo1,
  },
  {
    title: "DAO Governance Dashboard",
    description: "Develop a user-friendly interface for DAO members to vote, propose changes, and track...",
    difficulty: "Beginner",
    technology: ["React", "DAO", "Governance"],
    icon: logo2,
  },
  {
    title: "NFT Marketplace Expansion",
    description: "Contribute to the development of new features for a popular NFT marketplace. Enhance smart...",
    difficulty: "Expert",
    technology: ["Web3", "NFTs", "SmartContracts"],
    icon: logo3,
  },
];

/**
 * FeaturedProjects component
 *
 * This component renders a section showcasing featured projects.
 * It renders a header with a title and a button to view all projects.
 * It also renders a grid containing project cards.
 *
 * The component is responsive and scales according to the screen size.
 *
 * @returns {JSX.Element} The component JSX
 */
export default function FeaturedProjects() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-16 relative">
      <div className="sm:border sm:border-blue-900 rounded-3xl p-3 pt-0 sm:p-11 sm:pt-0 backdrop-blur-md relative overflow-hidden">
        {/* Background Grid */}
        <div className="max-sm:hidden absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Header Section */}
        <div className="text-center">
          <img src={featureIcon} alt="Featured Projects Icon" className="mx-auto mb-6 max-sm:w-24 " />
          <CustomText text="Featured Projects" style="text-5xl font-bold mb-10 max-sm:text-2xl"/>
          {/* <h2 className="text-5xl font-bold mb-10">Featured Projects</h2> */}
        </div>

        {/* Button */}
        <div className="flex justify-center mb-10 max-sm:mb-7">
          <Button className="rounded-full py-3 px-4 text-base max-sm:text-sm flex items-center">
            View all Projects <ArrowRightIcon className="ml-2" />
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-3 max-sm:grid-cols-2 max-sm:gap-3">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`backdrop-blur-lg transform ${
                index % 2 === 0 ? "sm:mb-7" : "sm:mt-7"
              }`}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-10 left-10 -z-10 hidden md:block">
        <img src={diamondBlur} alt="Decorative diamond blur" className="rotate-45 w-56" />
      </div>
      <div className="absolute top-10 -right-12 -z-10 hidden md:block">
        <img src={diamond} alt="Decorative diamond" className="w-56" />
      </div>
    </section>
  );
}
