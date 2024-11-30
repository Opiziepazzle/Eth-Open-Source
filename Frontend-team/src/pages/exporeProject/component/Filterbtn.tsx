import React from "react";
import vector from "../../../assets/icons/Vector (1).png";

const Filterbtn = ({ setOpenSide }: any) => {
  return (
    <div
      className="flex items-center justify-center rounded-[25px] border border-gray-400 w-[147px] h-[77px] gap-3 mt-16 cursor-pointer"
      onClick={() => setOpenSide(true)}
    >
      <img src={vector} alt="" className=" " />
      <p className="text-[#B3B8DB]">Filters</p>
    </div>
  );
};

export default Filterbtn;
