import React, { useState } from 'react'

import personIcon from "../../assets/icons/person.svg"
import maintainerIcon from "../../assets/icons/maintainer.svg"
import { ContributorsSideBar } from './components/ContributorsSideBar'
import { OBNavbar } from './components/OBNavbar'
import { Button } from '@/components/ui/button'
const Onboarding = () => {
  const [firstIndex, setfirstIndex] = useState(1);
  // const [activeIndex, setActiveIndex] = useState("contributor");
  const [active, setActive] = useState("contributor");


  return (
    <section className=' min-h-[100vh] relative z-10 bg-white'>
      {/* <div class="relative h-full w-full bg-white"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div></div> */}
      <div className="flex justify-between h-full">
        <div className="sm:w-[35%] bg-[#101323] min-h-[100vh] relative z-30">
          {/* <div className="absolute inset-0 z-20 h-full w-full bg-[#101323] bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:6rem_4rem]  [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#fff_70%,transparent_110%)]"></div> */}

          <ContributorsSideBar />
        </div>
        <div className="sm:w-[65%] bg-gradient-to-b  relative px-12 text-black">
          <div className="">
            <OBNavbar firstIndex={firstIndex} />
            <div className="w-[560px] mx-auto mt-40 flex flex-col gap-9">
              <div className="w-[400px]">
                <h1 className="text-4xl font-medium mb-3">Set up your profile</h1>
                <p className="text-[17px] leading-6">To get started, help us understand your main reason for joining Eth Open Source</p>
              </div>
              <div className=" flex flex-col gap-4">
                <OnboardingButton 
                  icon={personIcon} 
                  active={active}
                  onClick={()=> setActive("contributor")}
                  name="contributor"
                  title="Sign up as a Contributor" 
                  desc="Create a portfolio to discover open source projects, join amazing ethereum ecosystems and help them grow."
                />
                <OnboardingButton 
                  icon={maintainerIcon} 
                  active={active}
                  onClick={()=> setActive("maintainer")}
                  name="maintainer"
                  title="Sign up as a Maintainer" 
                  desc="Create and maintain open source ethereum projects and  find qualified contributors to join your team."
                />

              </div>
              <div className="">
                <Button onClick={() => setfirstIndex(firstIndex + 1)} variant={"secondary"} className='w-full p-6  rounded-full font-normal text-base'>Continue</Button>
              </div>
            </div>
          </div>
          {/* <div className="absolute inset-0 z-20 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]  [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#fff_70%,transparent_110%)]"></div> */}
        </div>
      </div>
    </section>
  )
}

export default Onboarding



export function OnboardingButton(props: any) 

  {
    return (
      <div  className={` text-black overflow-hidden p-[2px] rounded-3xl ${props.active !== props.name ? "flex bg-grayBlue" : "flex bg-gradient-to-r from-[#E8D07A] to-[#5312D6] "}`}>
        <button 
          className={`flex gap-5 items-center bg-white rounded-3xl p-5 ${props.active === props.name ? "bg-[#f8f8f0] " : "bg-white text-black"}`}
          onClick={props?.onClick}
          >
          <img src={props.icon} alt="icons" className="w-16" />
          <div className="">
            <h3 className="text-left text[22px] font-medium mb-1">{props.title}</h3>
            <p className="text-left text-[16px] font-normal">{props.desc}</p>
          </div>
        </button>
      </div>
    )
}
