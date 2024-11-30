import React, { useState } from "react";
import ExploreProjec from "./component/ExploreProjec";
import Filter from "./component/Filter";
import Newest from "./component/Newest";
import diamond from "../../assets/icons/diamond.png";
import diamondBlur from "../../assets/icons/diamondBlur.svg";
import Filterbtn from "./component/Filterbtn";

const ExploreProjecs = () => {
  const [openSide, setOpenSide] = useState(false);
  return (
    <div className="  mt-12 p-20 bg-[#0D0F1C]  min-h-[100vh] relative z-30 ">
      <ExploreProjec />
      <main className=" flex gap-4 justify-between">
        {openSide ? (
          <Filter setOpenSide={setOpenSide} />
        ) : (
          <Filterbtn setOpenSide={setOpenSide} />
        )}
        <Newest />
      </main>
    </div>
  );
};

export default ExploreProjecs;
