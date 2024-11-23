
import teamIcon from "../../../assets/icons/teamIcon.svg";
import diamonIcon from "../../../assets/icons/diamondIcon.svg";
import fastIcon from "../../../assets/icons/fastIcon.svg";
import womanLaptop from "../../../assets/images/womanLaptop.png";
import womanLaptMobile from "../../../assets/images/image20.png"
import womanLaptopMobile from "../../../assets/images/Framem1.svg"
import CustomText from "./CustomText";
import diamond from "../../../assets/icons/diamond.png"
import { useState } from "react";

/**
 * WhyChooseUs component.
 *
 * This component renders a section showcasing the benefits of using Eth Open Source.
 * It renders a brief overview, a list of benefits, and a call-to-action button.
 *
 * The component is responsive and scales according to the screen size.
 *
 * @returns {JSX.Element} The component JSX
 */

export default function WhyChooseUs() {

  const [index, setIndex] = useState(0)

  const benefits = [
    {
      icon: teamIcon,
      title: "Collaborate with Leading Developers",
      description: "Access a community of experienced contributors.",
    },
    {
      icon: diamonIcon,
      title: "Contribute and Earn",
      description: "Get paid for your contributions through cryptocurrency or custom payment options.",
    },
    {
      icon: fastIcon,
      title: "Build Your Skills",
      description: "Access learning resources, mentorship programs, and growth opportunities.",
    },
  ];

 

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 ">
      <div className="max-sm:hidden grid gap-8 md:grid-cols-2 items-center relative backdrop-blur-md">

        <div className=""><img src={womanLaptop} alt="" className="max-w-[787px] w-full" /></div>
        <div className="">
          <div className=" ">
            <CustomText style={"text-3xl mb-8 font-bold leading-tight md:text-5xl"} text="Why Choose Us" />
            <div className="">
              {benefits.map((benefit, id) => (
                <div className="flex mb-5 items-start gap-5" key={id}>
                  <img src={benefit.icon} alt="" className="w-14" />
                  <div className="">
                    <h3 className="text-2xl mb-2">{benefit.title}</h3>
                    <p className="text-grayBlue text-lg">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
        <div className="absolute top-0  right-10 -z-10">
          <img src={diamond} alt="" className=" w-56 blur-lg animate-float-slow" />
        </div>
      </div>
      <div className="flex flex-col items-center sm:hidden">
        <CustomText style={"text-3xl mb-8 font-bold leading-tight md:text-5xl max-sm:text-2xl max-sm:font-medium"} text="Why Choose Us" />
        <div className="flex relative border border-border rounded-3xl p-3 max-sm:py-9  ">
          <div className="flex-1 ml-3">{benefits.map((benefit, id) => (
            <div className="flex mb-5 items-start gap-5" key={id}>
              <img src={benefit.icon} alt="" className="w-14 max-sm:w-9 absolute -left-5" />
              <div className="">
                <h3 className="text-2xl mb-2 max-sm:mb-1 max-sm:text-base max-sm:font-normal max-sm:leading-1">{benefit.title}</h3>
                <p className="text-grayBlue text-lg max-sm:text-[10px] max-sm:font-normal max-sm:leading-4" >{benefit.description}</p>
              </div>
            </div>
          ))}</div>
          <div className="flex-1 flex items-center  relative">
            <div className="absolute  -right-5">

            <img src={womanLaptMobile} alt="" className="w-full -mr-6" />
            <img src={womanLaptopMobile} alt="" className="w-full" />

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}