import React from "react";
import frame from "../../../assets/images/Frame (10).png";
import usdt from "../../../assets/images/usdt.png";

import frames from "../../../assets/images/Frame (12).png";
const Pro = () => {
  return (
    <div className="min-h-screen  mt-28 p-3  max-sm:mt-12  ">
      <div className="flex ml-24 gap-1 max-sm:m-0  max-sm:p-5  ">
        <img src={frame} alt="" className="w-4 h-4 mt-1 cursor-pointer" />
        <p>Back</p>
      </div>
      <div className="  ">
        <div className="border border-custmBlue rounded-[16px] w-[413px] h-[820px]  ml-24 mt-8 max-sm:ml-0 max-sm:mt-0 max-sm:p-2 max-sm:w-full ">
          <div className="flex items-center gap-4 mt-5 p-2">
            <img src={frames} alt="" className="ml-2" />
            <h3>Project Overview</h3>
          </div>
          <div className="">
            <p className="font-matter text-base p-4  ">
              Get better understanding of what the project entails and if you
              fit in.
            </p>
          </div>
          <hr className=" border border-[#293056] mt-2 " />
          <div className="p-5 mt-4">
            <h3 className="">Funding Status</h3>
            <div className="w-8 h-8 flex gap-3 mt-3">
              <img src={usdt} alt="" /> -
            </div>
          </div>
          <div className=" p-2 ml-3">
            <h2 className=" text-white text-base font-semibold">Skill Level</h2>
            <div>
              <button className=" mt-4 text-sm  text-white  rounded-[8px] border border-[#363F72] hover:opacity-80 bg-[#101323]  p-[8px_16px]">
                Intermediate
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-3 p-4">
            <h3 className="text-white text-base font-semibold ">Skills</h3>

            <div className="grid grid-cols-3 gap-2 ">
              <button className="text-sm  text-white   rounded-[8px] border border-[#363F72] hover:opacity-80 bg-[#101323]  p-[8px_16px]">
                React
              </button>
              <button className="text-sm  text-white  rounded-[8px] border border-[#363F72] hover:opacity-80 bg-[#101323]  p-[8px_16px]">
                Security
              </button>
              <button className="text-sm  text-white  rounded-[8px] border border-[#363F72] hover:opacity-80 bg-[#101323]  p-[8px_16px]">
                Community
              </button>
              <button className="text-sm  text-white  rounded-[8px] border border-[#363F72] hover:opacity-80 bg-[#101323]  p-[8px_16px]">
                UX Design
              </button>
              <button className="text-sm  text-white  rounded-[8px] border border-[#363F72] hover:opacity-80 bg-[#101323]  p-[8px_16px]">
                Solidity
              </button>
              <button className="text-sm  text-white  rounded-[8px] border border-[#363F72] hover:opacity-80 bg-[#101323]  p-[8px_16px]">
                Marketing
              </button>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <h1 className="ml-6">Contributors</h1>
            <p className="mr-6 text-customBlue">View all</p>
          </div>
          <p className="mt-2 ml-6">-</p>
          <div className="gap-2 space-x-1">
            <h2 className="mt-4 ml-5 p-2">Tasks Overview</h2>
            <div className="grid grid-cols-2 ml-6 max-sm:gap-1 max-sm:ml-6">
              <button className="text-sm  text-white w-[170.5px] h-[70px]  rounded-[8px] border border-[#363F72] hover:opacity-80 bg-[#101323]  ">
                <p className="mr-32">0</p>
                <p className="mr-16">New Issues</p>
              </button>
              <button className="text-sm  text-white w-[170.5px] h-[70px] rounded-[8px] border border-[#363F72] hover:opacity-80 bg-[#101323]  ">
                <p className="mr-32">0</p>
                <p className="mr-16">In-progress</p>
              </button>
              <div className="mt-2">
                <button className="text-sm  text-white w-[170.5px] h-[70px] rounded-[8px] border border-[#363F72] hover:opacity-80 bg-[#101323] ">
                  <p className="mr-32">0</p>
                  <p className="mr-24">Urgent</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pro;
