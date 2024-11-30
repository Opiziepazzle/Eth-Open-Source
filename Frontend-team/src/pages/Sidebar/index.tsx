import React from "react";
import Pro from "./component/Pro";
import Card from "./component/Card";

const Sidebar = () => {
  return (
    <div>
      <div className="  sm:flex lg:flex bg-[#101323] gap-6 ">
        <Pro />
        <Card />
      </div>
    </div>
  );
};

export default Sidebar;
