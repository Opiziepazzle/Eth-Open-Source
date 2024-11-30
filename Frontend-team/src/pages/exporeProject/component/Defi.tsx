import logo1 from "../../../assets/images/logo1.png";

import skillIcon from "../../../assets/icons/skill.svg";
import frame from "../../../assets/icons/Frame.svg";

import icon2 from "../../../assets/icons/icon2.svg";
import icon3 from "../../../assets/icons/icon3.svg";
import cicle from "../../../assets/icons/ciclle.png";
import usdt from "../../../assets/images/usdt.png";
import arrow from "../../../assets/images/arrow5.png";
import arrow2 from "../../../assets/images/arrow5.png";

const Defi = ({ project }: any) => {
  return (
    <div
      className={`max-sm:hidden p-5 border border-border backdrop-blur-md  bg-white bg-opacity-5 rounded-3xl `}
    >
      <div className="flex items-center justify-between">
        <img src={project?.icon} alt="" className="h-20 w-20 mb-5" />
        <img src={project?.frame} alt="" className="w-6 h-6 mb-16" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-5">{project?.title}</h3>
      <p className="text-[#B3B8DB] text-base mb-5">{project?.description}</p>
      <div className="flex gap-2 text-sm items-center mb-5 flex-wrap">
        <img src={skillIcon} alt="" className="w-4 h-4 mb-5" />
        <div className="flex gap-2 ">
          {project?.technology.map((item: string, id: number) => (
            <span className="text-sm" key={id}>
              {`${item}${id + 1 < project?.technology.length ? "," : ""}`}
            </span>
          ))}
          <img src={frame} alt="" className="w-4 h-4 gap-2 mt-1" />
          <p className="text-[#B3B8DB]  mb-5  font-sans text-base font-normal">
            {project?.para}
          </p>
          <img src={icon2} alt="" className="w-4 h-4 mt-1 gap-2" />
          <img src={icon3} alt="" className="w-4 h-4 mt-1" />
        </div>
        <div className="border-border border backdrop-blur-sm py-2 px-4 rounded-3xl mb-4">
          <p className="overflow-hidden">{project?.difficulty}</p>
        </div>
      </div>

      <hr className="bg-gray-400" />
      <div className="flex items-center justify-start p-2 gap-3">
        <div className="w-[154px] h-[33px gap-2 rounded-[1000px] bg-[#0D0F1C] border border-[#363F72] flex p-1">
          <img src={cicle} alt="" className="w-4 h-4 mt-1 " />
          <p className="text-white">{project?.pros}</p>
        </div>
        <div className="border-border border backdrop-blur-sm py-2 px-4 rounded-3xl mb-4 mt-2">
          <p className="overflow-hidden">{project?.letter}</p>
        </div>
        <div className="border-border border backdrop-blur-sm py-2 px-4 rounded-3xl mb-4 mt-2">
          <p className="overflow-hidden">{project?.leter}</p>
        </div>
        <div className="border-border border backdrop-blur-sm py-2 px-4 rounded-3xl mb-4 mt-2">
          <p className="overflow-hidden">{project?.let}</p>
        </div>
        <img src={usdt} alt="" className="w-8 h-8 mb-2" />
        <p className="mb-2">{project?.usdt}</p>
        <div className="border-border border-image-gradient border-[1px] backdrop-blur-sm py-2 px-4 rounded-3xl mb-4 mt-2 ml-20 flex items-center justify-between">
          <p className="overflow-hidden">{project?.btn}</p>{" "}
          <img src={arrow} alt="" className="w-4 h-4 " />
        </div>
      </div>
    </div>
  );
};

export default Defi;
