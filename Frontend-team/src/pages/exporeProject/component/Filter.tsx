import { useState } from "react";
import Frame from "../../../assets/icons/Frame (2).png";
import vector from "../../../assets/icons/Vector (1).png";

const Filter = ({ setOpenSide }: any) => {
  return (
    <div className="min-h-screen w-auto h-[900px] border border-customBlue gap-24 rounded-[16px] mt-12  p-5  ">
      <div className="relative">
        <div className="flex items-center justify-between p-4">
          <p className="font-bold ">Filters</p>
          <img
            src={Frame}
            alt=""
            onClick={() => setOpenSide(false)}
            className="cursor-pointer"
          />
        </div>
        <p className="ml-4">Find projects tailored to your skills and goals.</p>
        <hr className="mt-6" />
      </div>
      <div className="flex items-center justify-start mt-4 p-6 gap-2">
        <button className="text-sm  text-white  p-[8px_16px] rounded-[8px]  border border-[#363F72] hover:opacity-80 bg-[#101323] ">
          Trending
        </button>
        <button className="  text-sm  text-white  p-[8px_16px] rounded-[8px] border border-[#363F72] hover:opacity-80 bg-[#101323] ">
          Most Active
        </button>
      </div>
      <div className="p-5">
        <button className="text-sm  text-white  rounded-[8px] border border-[#363F72] hover:opacity-80 bg-[#101323]  p-[8px_16px] ">
          Active Issues
        </button>
      </div>

      <div className="flex flex-col space-y-2 p-5">
        <h1 className="text-white text-base font-semibold">Experience Level</h1>
        <div className="flex space-x-2">
          <button className="text-sm  text-white  rounded-[8px] border border-[#363F72] hover:opacity-80 bg-[#101323]  p-[8px_16px]">
            Beginner
          </button>
          <button className="text-sm  text-white  rounded-[8px] border border-[#363F72] hover:opacity-80 bg-[#101323]  p-[8px_16px]">
            Intermediate
          </button>
          <button className="text-sm  text-white  rounded-[8px] border border-[#363F72] hover:opacity-80 bg-[#101323]  p-[8px_16px]">
            Expert
          </button>
        </div>
      </div>

      <div className="flex flex-col space-y-2 p-5">
        <h3 className="text-white text-base font-semibold">Rewards</h3>

        <div className="flex space-x-2">
          <button className="text-sm  text-white  rounded-[8px] border border-[#363F72] hover:opacity-80 bg-[#101323]  p-[8px_16px]">
            Lowest
          </button>

          <button className="text-sm  text-white  rounded-[8px] border border-[#363F72] hover:opacity-80 bg-[#101323]  p-[8px_16px]">
            Highest
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-2 p-5">
        <h3 className=" text-white text-base font-semibold">Projects Types</h3>
        <div className="flex space-x-2">
          <button className="text-sm  text-white  rounded-[8px] border border-[#363F72] hover:opacity-80 bg-[#101323]  p-[8px_16px]">
            Volunteer
          </button>

          <button className="text-sm  text-white  rounded-[8px] border border-[#363F72] hover:opacity-80 bg-[#101323]  p-[8px_16px]">
            Funded
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-2 p-5">
        <h3 className="text-white text-base font-semibold">Date</h3>
        <div className="flex space-x-2">
          <button className="text-sm  text-white  rounded-[8px] border border-[#363F72] hover:opacity-80 bg-[#101323]  p-[8px_16px]">
            Newest first
          </button>

          <button className="text-sm  text-white  rounded-[8px] border border-[#363F72] hover:opacity-80 bg-[#101323]  p-[8px_16px]">
            Oldest First
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
    </div>
  );
};

export default Filter;
