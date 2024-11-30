import React from "react";
import logo1 from "../../../assets/images/logo1.png";
import circle from "../../../assets/icons/ciclle.png";
import skillIcon from "../../../assets/icons/skill.svg";
import image23 from "../../../assets/images/image21.png";
const Card = () => {
  return (
    <div className="mt-44 max-sm:mt-0">
      <div className="rounded-[24px] w-[296px] h-[51px] border border-[#293056]  items-center justify-center flex  p-3 ">
        <button className="px-4 py-2 hover:bg-[#293056] transition rounded-full text-sm font-medium text-center">
          Project Overview
        </button>
        <button className="px-4 p-2 rounded-full text-sm font-medium hover:bg-[#293056] transition text-center ">
          Collaborators
        </button>
      </div>

      <div className="w-[836px] h-[204px] rounded-[16px] border border-[#293056] mt-8 p-5 flex   gap-2 max-sm:p-4 max-sm:w-[500px]">
        <img src={logo1} alt="" className="w-[80px] h-[80px] " />

        <div className="flex  flex-col  ">
          <p className="font-custom text-2xl font-medium leading-[28.8px] tracking-[-0.015em]">
            DeFi Protocol Enhancement
          </p>
          <div className="flex gap-4 mt-4">
            <div className="flex  items-center gap-1 rounded-[16px] border border-[#363F72] w-36 ">
              <img src={circle} alt="" className="w-4 h-4 mt-1" />
              <p>Eth Open Source</p>
            </div>
            <div className="flex items-center gap-2 ">
              <img src={skillIcon} alt="" className="w-4 h-4" />
              <p>Solidity,</p>
              <p>DeFi,</p>
              <p>Security</p>
            </div>
          </div>

          <div className="w-[700px] h-[44px] text-left max-sm:w-[600px]">
            <p className="mt-4 text-[#B3B8DB]">
              Help improve the security and scalability of a cutting-edge
              decentralized finance protocol. Collaborate with experienced
              developers to optimize smart contracts and create robust security
              measures.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 max-sm:w-full max-sm:p-4">
        <h2
          className="font-
Kern font-[24px]"
        >
          Available Tasks
        </h2>
        <div className="w-[900px)] h-[469px] border border-[#293056] mt-5 rounded-[16px] p-5 max-sm:w-full">
          <hr />
          <div className="mt-6 flex flex-col   items-center justify-center  h-40 max-sm:mt-6">
            <img
              src={image23}
              alt="No projects"
              className="  mt-60 max-sm:mt-60"
            />

            <p className="text-[18px] font-medium text-center mt-8 p-2  max-sm:mt-0">
              Nothing to see...
            </p>
            <p className="text-gray-500 text-sm p-2">
              No contributions have been made yet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
