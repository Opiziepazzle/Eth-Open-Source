import logo1 from "../../../assets/images/logo1.png";
import frame from "../../../assets/icons/Frame (3).svg";

const Setup = () => {
  return (
    <div>
      <div className="w-[574px] h-auto pt-4 gap-4 rounded-[16px] border flex flex-wrap">
        <img
          src={logo1}
          alt=""
          className="w-10 h-10 gap-0 rounded-[10px] border mb-3 ml-2"
        />
        <p className="font-matter text-base font-normal leading-[19.2px] text-left top-8">
          DeFi Protocol Enchancement
          <div className="w-[331px] bg-gray-200 rounded h-1 dark:bg-black mt-4 ">
            <div className="bg-gray-100 h-1 rounded w-60"></div>
          </div>
        </p>
        <div className="flex items-center  space-x-4 ml-auto -mt-28">
          <div className="text-gray-400 text-sm flex flex-col items-center mt-16 p-2 space-x-2">
            <span>
              <img src={frame} alt="" className="" />
              Due by 8th Nov
            </span>

            <span>2/3 Tasks Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;
