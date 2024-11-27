import { Button } from './ui/button'
import skillIcon from "../assets/icons/skill.svg";
import { ArrowRightIcon } from 'lucide-react';
// import {IProjectItem} from "./types"
const ProjectCaard = ({ project }: any) => {
  return (
    <>
      <div className={` p-5 max-sm:p-6 border border-border backdrop-blur-md  bg-white bg-opacity-5 rounded-3xl max-sm:mx-2 max-sm:mb-5  `}>
        <img src={project.icon} alt="" className="h-20 w-20 mb-5 max-sm:w-16 max-sm:h-16" />
        <h3 className="text-2xl font-bold text-white mb-5 max-sm:font-medium">{project.title}</h3>
        <p className="text-[#B3B8DB] text-base mb-5">{project.description}</p>

        <div className="flex gap-2 text-sm items-center mb-5 flex-wrap max-sm:w-52 max-sm:gap-3">
          <img src={skillIcon} alt="" className='w-4 h-4' />
          <div className="flex gap-1 ">
            {project.technology.map((item: string, id: number) => <span className='text-sm' key={id}>{`${item}${id + 1 < project.technology.length ? "," : ""}`}</span>)}
          </div>
          <div className="border-border border backdrop-blur-sm py-2 px-4 rounded-3xl">
            <p className="overflow-hidden">{project.difficulty}</p>
          </div>

        </div>
        <div className="flex justify-end">
          <Button className="rounded-full bg-transparent text-white hover:text-gray-700 justify-self-end text-base">
          View Project <ArrowRightIcon />
          </Button>
        </div>
      </div>

      {/* Mobile Project Card */}
      {/* <div className="sm:hidden ">
        <div className="border border-border rounded-3xl p-3">
          <img src={project.icon} alt="" className=" mb-5 mx-auto w-10" />
          <h3 className="max-sm:text-xs text-2xl font-bold text-white mb-5 max-sm:mb-2">{project.title}</h3>
          <p className="text-[#B3B8DB] max-sm:text-[10px] max-sm:leading-4 text-base mb-5 max-sm:mb-1">{project.description}</p>
          <div className="flex justify-end">
            <Button className=" bg-transparent text-white justify-self-end text-base w-fit">
              <ArrowRightIcon />
            </Button>
          </div>
        </div>

        <div className="text-[10px] gap-[11] text-white mt-3">
          <div className="flex justify-center items-center mb-3">
            
              <img src={skillIcon} alt="" className='w-4 h-4 mr-2' />
           
            <div className="flex gap-1 ">
              {project.technology.map((item: string, id: number) => <span className='' key={id}>{`${item}${id + 1 < project.technology.length ? "," : ""}`}</span>)}
            </div>
          </div>
          <div className="border-border border backdrop-blur-sm py-2 px-4 rounded-3xl w-fit mx-auto">
            <p className="overflow-hidden text-center">{project.difficulty}</p>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default ProjectCaard
