import { Dispatch, SetStateAction} from "react";
import Input from "../Input";
import { Button } from "@/components/ui/button";
import gitHubIcon from "../../../../assets/icons/githubIcon.svg"
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import formStyles from "./formStyles";
interface SecondScreenProps {
  firstIndex: number; // The current step index in the onboarding process
  setFirstIndex: Dispatch<SetStateAction<number>>; // Function to update the step index
//   gitHubIcon: string; // URL or path to the GitHub icon image
}

export const SecondScreen: React.FC<SecondScreenProps> = ({
  firstIndex,
  setFirstIndex,
//   gitHubIcon,
}) => {
//   const [active, setActive] = useState<string | null>(null);
const { user} = useSelector((state: RootState) => state.auth);

  // const [userInfo, setuserInfo] = useState(user)
  // console.log(userInfo)
  return (
    <div className={formStyles.container}>
      <div className={formStyles.headWrapper}>
        <h1 className={formStyles.title}>Verify information</h1>
        <p className={formStyles.desc}>
          To create your account, we need some basic information
        </p>
      </div>
      <div className="flex gap-4">
        <div className="flex justify-center items-center bg-black rounded-sm w-20 h-20">
          <img src={gitHubIcon} alt="GitHub Icon" className="w-11 h-11" />
        </div>
        <Input title="GitHub Account" placeholder="surname" value={user?.displayName} />
      </div>
      <hr className="border-border border border-opacity-35" />
      <Input title="Personal Email" placeholder="noyinoyi@gmail.com" value={user?.email}/>
      <Input title="Telegram" placeholder="Enter your Telegram username" />

      <div className={formStyles.btnGroup}>
        <Button
          onClick={() => setFirstIndex(firstIndex - 1)}
          variant={"outline"}
          className="w-full p-6 bg-white rounded-full font-normal text-base"
        >
          Back
        </Button>
        <Button
          onClick={() => setFirstIndex(firstIndex + 1)}
          variant={"secondary"}
          className="w-full p-6 rounded-full font-normal text-base"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
