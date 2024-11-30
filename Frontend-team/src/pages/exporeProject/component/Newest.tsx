import logo1 from "../../../assets/images/logo1.png";
import logo2 from "../../../assets/images/logo2.png";
import logo3 from "../../../assets/images/logo3.png";
import ProjecCard from "@/components/ProjecCard";
import frame from "../../../assets/images/Frame (7).png";
import icon2 from "../../../assets/icons/icon2.svg";
import icon3 from "../../../assets/icons/icon3.svg";
import Frame2 from "../../../assets/icons/Frame (2).svg";
import { useNavigate } from "react-router-dom";
import Domaindata from "../../../Domaindata.json";
const Newest = () => {
  interface Project {
    title: string;
    description: string;
    difficulty: string;
    technology: string[];
    icon: string;
    frame: string;
    icon2: string;
    icon3: string;
    pros: string;
    letter: string;
    leter: string;
    let: string;
    usdt: string;
    btn: string;
    Frame2: string;
  }
  const projects: Project[] = [
    {
      title: "DeFi Protocol Enhancement",
      description:
        "Help improve the security and scalability of a cutting-edge decentralized finance protocol. Collaborate with experienced developers to optimize smart contracts and create robust security measures.",
      difficulty: "Intermediate",
      technology: ["Solidity", "Defi", "Security"],
      icon: logo1,
      frame: frame,
      icon2: icon2,
      icon3: icon3,
      pros: "Eth Open Source",
      letter: "Design",
      leter: "Community",
      let: "React",
      usdt: "12k+ USDT",
      btn: "View Project",
      Frame2: Frame2,
    },
    {
      title: "DAO Governance Dashboard",
      description:
        "Develop a user-friendly interface for DAO members to vote, propose changes, and track governance decisions. This project focuses on improving transparency and community engagement.",
      difficulty: "Beginner",
      technology: ["React", "DAO", "Governance"],
      icon: logo2,
      frame: frame,
      icon2: icon2,
      icon3: icon3,
      pros: "Eth Open Source",
      letter: "Design",
      leter: "Community",
      let: "React",
      usdt: "12k+ USDT",
      btn: "View Project",
      Frame2: Frame2,
    },
    {
      title: "NFT Marketplace Expansion",
      description:
        "Contribute to the development of new features for a popular NFT marketplace. Enhance smart contract functionalities, integrate new payment options, and optimize performance.",
      difficulty: "Expert",
      technology: ["Web3", "NFTs", "SmartContracts"],
      icon: logo3,
      frame: frame,
      icon2: icon2,
      icon3: icon3,
      pros: "Eth Open Source",
      letter: "Design",
      leter: "Community",
      let: "React",
      usdt: "12k+ USDT",
      btn: "View Project",
      Frame2: Frame2,
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-between  mt-12 p-2">
        <select className="bg-gray-100 text-black  rounded-[20px]  ">
          <option>Sort by - Newest</option>
          <option>Sort by - Oldest</option>
        </select>
        <p
          className="text-[#717BBC]
"
        >
          1000+ Projects
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-1 p-4">
        {projects.map((project, index) => (
          <ProjecCard project={project} key={index} />
        ))}
        {projects.map((project, index) => (
          <ProjecCard project={project} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Newest;
