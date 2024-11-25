import React from 'react'
import diamond from "../../../assets/icons/diamond.png"
import diamondIcon from "../../../assets/icons/eth.svg"
import star from "../../../assets/images/rsz_stars.png"
import CustomText from '@/pages/landingPage/components/CustomText'
export const ContributorsSideBar = () => {
  return (
    <div className="p-12  h-full ">
      <div className="z-50 flex flex-col  justify-between h-full max-w-[440px] mx-auto">
        <img src="/EthOpenSource.svg" alt="logo" className="w-[255px] z-50" />
        <div className="flex flex-col gap-7 mb-9">
          <img src={star} alt="" className="w-20 " />
          <CustomText text="Welcome to Eth Open Source!" style="font-semibold text-[60px] leading-[70px]" />
          <p className="text-white text-lg font-normal z-50">Start building your contributor profile by following a few quick steps. Each detail helps connect you with projects where your skills are needed. Let’s get you set up and ready to contribute!</p>
        </div>
      </div>

      <div className="absolute  transform z-0 top-20 -right-20">
        <img src={diamondIcon} alt="" className="w-[301px]" />
      </div>
      <div className="absolute bottom-0 right-0 transform  -z-10">
        <img src={diamond} alt="" className="blur-3xl" />
      </div>
      <div className="absolute top-40 left-32 transform -translate-x-1/2 -translate-y-1/2 -z-10">
        <img src={diamond} alt="" className="blur-xl" />
      </div>
    </div>
  )
}
