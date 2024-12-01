
import logo from "../assets/icons/EthOpenSource.svg";
import instagramIcon from "../assets/icons/instagram.svg";
import xIcon from "../assets/icons/xIcon.svg";
import linkedInIcon from "../assets/icons/indeedIcon.svg";
import CustomText from "@/pages/landingPage/components/CustomText";
import CustomBtn from "./CustomBtn";
export default function Footer() {
  return (
<<<<<<< HEAD
    <footer className="border-t border-border py-9  ">
      <div className="pt-32 container mx-auto mb-20 flex flex-wrap justify-between">
        <div className="max-w-80 ">
=======
    <footer className="border-t border-border py-9  max-sm:py-5 max-sm:px-4">
      <div className="pt-32 max-sm:pt-16 container mx-auto mb-20 flex flex-wrap justify-between">
        <div className="max-w-80  ">
>>>>>>> origin/johnsdanlami
          <CustomText text={"Empowering Ethereum Through Open-Source"} style="text-3xl text-[28px] font-medium mb-9" />
          <div className="flex gap-5">
            <CustomBtn text="" colored="yes" style="w-fit w-[48px] h-[48px]" iconStyle="w-[20px]" icon={instagramIcon} />
            <CustomBtn text="" colored="yes" style="w-fit w-[48px] h-[48px]" iconStyle="w-[20px]" icon={xIcon} />
            <CustomBtn text="" colored="yes" style="w-fit w-[48px] h-[48px]" iconStyle="w-[20px]" icon={linkedInIcon} />
          </div>
        </div>
<<<<<<< HEAD
        <div className="flex flex-wrap sm:gap-12">
          <div className="max-w-[336px] ">
=======
        <div className="flex flex-wrap sm:gap-12 ">
          <div className="max-w-[336px] max-sm:mt-9">
>>>>>>> origin/johnsdanlami
            <p className="text-base text-grayBlue">Platform</p>
            <div className="flex flex-wrap gap-3 mt-2">
              <a href="#" className="border-border border py-2 px-4 rounded-3xl">Home</a>
              <a href="#" className="border-border border py-2 px-4 rounded-3xl">Projects</a>
              <a href="#" className="border-border border py-2 px-4 rounded-3xl">Contributors</a>
              <a href="#" className="border-border border py-2 px-4 rounded-3xl">Rewards</a>
              <a href="#" className="border-border border py-2 px-4 rounded-3xl">Community</a>
            </div>
          </div>
<<<<<<< HEAD
          <div className="max-w-[336px] ">
=======
          <div className="max-w-[336px] max-sm:mt-9">
>>>>>>> origin/johnsdanlami
          <p className="text-base text-grayBlue">Learn</p>
            <div className="flex flex-wrap gap-3 mt-2">
              <a href="#" className="border-border border py-2 px-4 rounded-3xl">Blog</a>
              <a href="#" className="border-border border py-2 px-4 rounded-3xl">FAQ</a>
              <a href="#" className="border-border border py-2 px-4 rounded-3xl">Changelog</a>
            </div>
          </div>
        </div>

      </div>
      <div className="container mx-auto">
<<<<<<< HEAD
        <div className="text-base text-grayBlue flex justify-between my-5">
          <p className="">Copyright ©️ 2024 Projecty. All rights reserved.</p>
          <div className="flex gap-5">
=======
        <div className="text-base text-grayBlue flex justify-between my-5 max-sm:flex-col max-sm:items-center max-sm:gap-5">
          <p className="">Copyright ©️ 2024 Projecty. All rights reserved.</p>
          <div className="flex gap-5 max-sm:flex-col">
>>>>>>> origin/johnsdanlami
            <a href="" className="">Privacy Policy</a>
            <a href="" className="">Terms of Service</a>
            <a href="" className="">Cookie Settings</a>
          </div>
        </div>
<<<<<<< HEAD
        <img src={logo} alt="" className="w-full" />
=======
        <img src={logo} alt="" className="w-full max-sm:mt-5" />
>>>>>>> origin/johnsdanlami
      </div>
    </footer>
  );
}