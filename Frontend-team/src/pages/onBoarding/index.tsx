import { useEffect, useState } from 'react'

// import personIcon from "../../assets/icons/person.svg"
// import maintainerIcon from "../../assets/icons/maintainer.svg"
import { ContributorsSideBar } from './components/ContributorsSideBar'
import { OBNavbar } from './components/OBNavbar'
// import { Button } from '@/components/ui/button'
import { FirstScreen } from './components/form/FirstScreen'
import { SecondScreen } from './components/form/SecondScreen'
import { ThirdScreen } from './components/form/ThirdScreen'
import { FourthScreen } from './components/form/FourthScreen'
import { FifthScreen } from './components/form/FifthScreen'
import { SixthScreen } from './components/form/SixthScreen'
// import { signInWithGithub } from './components/SignUpWithGithub'
// import { useDispatch, useSelector } from "react-redux";

// import { Sign } from 'crypto'
// import { RootState } from '@/store'
// import { loginWithGitHub } from '@/store/actions/auth'

 


const Onboarding = () => {
  const [firstIndex, setfirstIndex] = useState(1);
  // const [activeIndex, setActiveIndex] = useState("contributor");
  // const [active, setActive] = useState("contributor");
  // const dispatch = useDispatch();
  // const { user, isLoading, error } = useSelector((state: RootState) => state.auth);

  // const [userData, setUserData] = useState({
  //   name: "",
  //   email: "",
  //   bio: "",
  //   role:"",
  //   telegram: "",
  //   github: "",
  //   linkedin: "",
  //   twitter: "",
  //   location: "",
  //   company: "",
  // })

  useEffect(() => {
    
  
    return () => {
      
    }
  }, [])
  

  return (
    <section className=' min-h-[100vh]  relative z-10 bg-white'>
      {/* <div class="relative h-full w-full bg-white"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div></div> */}
      <div className="flex justify-between h-full">
        <div className="sm:w-[35%] bg-[#101323] min-h-[100vh] relative z-30 max-sm:hidden">
          {/* <div className="absolute inset-0 z-20 h-full w-full bg-[#101323] bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:6rem_4rem]  [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#fff_70%,transparent_110%)]"></div> */}

          <ContributorsSideBar />
        </div>
        <div className="sm:w-[65%] max-sm:px-3 w-full bg-gradient-to-b  relative px-12  text-black pb-9">
          <div className=" h-full ">

            <OBNavbar firstIndex={firstIndex} />
            <div className="flex items-center justify-center max-sm:block flex-col h-full">
              {firstIndex === 1 ?
                <FirstScreen firstIndex={firstIndex} setFirstIndex={setfirstIndex}/>
                : firstIndex === 2 ?
                  <SecondScreen firstIndex={firstIndex} setFirstIndex={setfirstIndex} />
                  : firstIndex === 3 ?
                    <ThirdScreen firstIndex={firstIndex} setFirstIndex={setfirstIndex} />
                    : firstIndex === 4 ?
                      <FourthScreen firstIndex={firstIndex} setFirstIndex={setfirstIndex} />
                      : firstIndex === 5 ?
                        <FifthScreen firstIndex={firstIndex} setFirstIndex={setfirstIndex} />
                        : <SixthScreen firstIndex={firstIndex} setFirstIndex={setfirstIndex} />
              }
            </div>
          </div>
          {/* <div className="absolute inset-0 z-20 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]  [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#fff_70%,transparent_110%)]"></div> */}
        </div>
      </div>
    </section>
  )
}

export default Onboarding




