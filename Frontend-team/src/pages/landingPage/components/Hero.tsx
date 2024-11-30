import ethIcon from "../../../assets/icons/eth.svg";
import tetherIcon from "../../../assets/icons/tether.svg";
import CustomBtn from "@/components/CustomBtn";
import githubIcon from "../../../assets/icons/githubIcon.png"
import ethicon from "../../../assets/icons/ethIcon.svg"
import heroBg from "../../../assets/images/Background For Hero.png"
import CustomText from "./CustomText";

/**
 * The Hero component is the main section of the landing page. It contains a title, a description, and a call to action button to login with Github.
 *
 * The component is fully responsive and has a few animations to make it visually appealing.
 *
 * The component also includes a few decorative elements to make the page more visually appealing.
 */
export default function Hero() {
  return (

    <section className="relative ">
      <div className=" mx-auto max-w-7xl px-4 sm:py-24 mb-32">

        <div className="sm:space-y-8 space-y-4 text-center sm:w-full w-72 mx-auto">
          <CustomText style={"sm:text-4xl text-2xl font-bold leading-tight sm:text-6xl"} text={"Fueling Ethereum Community with  Open-Source Contribution"} />
          <p className="mx-auto max-w-2xl sm:text-lg text-xs text-gray-400">
            Join our thriving community of developers and contribute to the future of Ethereum ecosystem
          </p>
          <div className="flex justify-center gap-4 items-center">
            <CustomBtn text="Login with GIthub" icon={githubIcon} colored="yes" />
            <CustomBtn text="Learn More" icon={ethicon} />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute right-0 -top-96 left-0 ">
          <img src={heroBg} alt="Hero background" className="" />
        </div>

        <div className="relative md:mb-52 px-4 sm:p-0 mt-3">
          <div className="absolute left-0 top-6 sm:top-0 -z-50 ">
            <img src={tetherIcon} alt="" className="md:w-72  w-[90px] animate-float-slow" />
          </div>
          <div className="absolute right-0 top-0 -z-50 ">
            <img src={ethIcon} alt="" className="animate-pulse  md:w-72 w-[90px]" />
          </div>
        </div>
        {/* <div className="absolute -left-20 top-40">
        <div className="h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"></div>
        </div> */}
      </div>

    </section>
  );
}