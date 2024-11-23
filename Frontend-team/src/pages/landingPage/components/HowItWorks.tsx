import featureIcon from "../../../assets/icons/feature.svg";
import googleIcon from "../../../assets/icons/googleIcon.svg";
import gitHubIcon from "../../../assets/icons/githubIcon.svg";
import gmailIcon from "../../../assets/icons/emailIcon.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import diamond from "../../../assets/icons/diamond.png";
import logo from "../../../assets/icons/EthOpenSource.svg";
import CustomBtn from "@/components/CustomBtn";
import CustomText from "./CustomText";


/**
 * HowItWorks component.
 *
 * This component renders a section on the landing page that explains how the platform works.
 * It includes a brief overview of the platform, a sign up form, and a call to action button.
 *
 * The component is responsive and scales according to the screen size.
 *
 * @returns {JSX.Element} The component JSX
 */
export default function HowItWorks() {
  const h = () => {
    console.log("object")
  }
  return (
    <section className="mx-auto max-w-7xl px-4">
      <img src={featureIcon} alt="" className="mx-auto max-sm:w-24" />

      <div className="py-2">
        <div className="flex justify-center items-center sm:mt-3">
          <CustomText text="How It Works" style="text-center text-5xl max-sm:text-2xl leading-8 font-bold mx-auto"/>
        </div>
        <div className="flex justify-center my-12">
          <Tabs defaultValue="account" className="h-full mx-auto relative w-full flex flex-col items-center justify-center" activationMode="automatic">
            <TabsList className="rounded-full border-border border h-full max-sm:h-14 p-2 text-xl bg-transparent w-fit max-sm:w-72 " >
              <TabsTrigger defaultChecked value="account" className="py-3 px-6 rounded-3xl text-xl max-sm:text-[10px] max-sm:font-normal max-sm:px-6 max-sm:py-3 max-sm:w-full">Step 1</TabsTrigger>
              <TabsTrigger value="step2" className="py-3 px-6 rounded-3xl text-xl max-sm:text-[10px] max-sm:font-normal max-sm:px-6 max-sm:py-3 max-sm:w-full">Step 2</TabsTrigger>
              <TabsTrigger value="step3" className="py-3 px-6 rounded-3xl text-xl max-sm:text-[10px] max-sm:font-normal max-sm:px-6 max-sm:py-3max-sm:w-full max-sm:w-full">Step 3</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="w-full">
              <div className="sm:backdrop-blur-md w-full sm:border sm:border-border sm:overflow-hidden rounded-3xl sm:h-[500px] max-sm:mt-5 flex items-center justify-center gap-3 flex-wrap">
                <div className="flex p-3">
                  <p className="bg-white text-black text-2xl w-10 h-9 max-sm:w-5 max-sm:h-5 rounded-full flex items-center justify-center mr-7 max-sm:mr-3 max-sm:text-[10px] ">1</p>
                  <div className="">
                    <h2 className="text-[32px] text-white max-sm:text-lg">Sign Up and Create Your Profile</h2>
                    <p className="text-grayBlue text-xl max-w-[536px] max-sm:text-[10px]">Join the platform, create your profile, and highlight your skills.</p>
                  </div>
                </div>
                <div className="border border-border rounded-3xl p-6 transition-all ease-in-out hover:mb-0 sm:-mb-24 bg-[#D0D5DD] bg-opacity-5 backdrop-blur-lg max-w-[480px] w-full flex items-center flex-col">
                  <img src={logo} alt="" className="max-w-64 my-5" />
                  <div className="w-fit mb-5">
                    <h2 className="mb-1 text-[28px] max-sm:text-lg">Create your Projecty account</h2>
                    <p className="text-grayBlue text-lg max-sm:text-lg">Transform the way you manage projects.</p>
                  </div>
                  <div className="w-full flex flex-col items-center  my-5 gap-3">
                    <CustomBtn onClick={h} style={"max-w-[416px] h-[48px] w-full"} colored="yes" text="Continue with Github" icon={gitHubIcon} />
                    <div className="flex justify-between items-center w-full">
                      <hr className="w-full  "/>
                      <span className=" text-gray-400 px-4">OR</span>
                      <hr className="w-full"/>
                    </div>
                    <CustomBtn onClick={""} style={"max-w-[416px] h-[48px] w-full mb-2"} colored="yes" text="Continue with Email" icon={gmailIcon}  />
                    <CustomBtn onClick={""} style={"max-w-[416px] h-[48px] w-full"} colored="yes" text="Continue with Google" icon={googleIcon} />

                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="step2" className="w-full">Step 2</TabsContent>
            <TabsContent value="step3" className="w-full">Step 3</TabsContent>
            <div className="absolute top-20  right-[50%] -z-10">
              <img src={diamond} alt="" className=" w-56 blur-sm animate-pulse" />
            </div>
          </Tabs>

        </div>

      </div>



    </section>
  );
}