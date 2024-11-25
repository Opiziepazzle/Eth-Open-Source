import { Dispatch, SetStateAction} from "react";
import Input from "../Input";
import { Button } from "@/components/ui/button";
import gitHubIcon from "../../../../assets/icons/githubIcon.svg"
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

  return (
    <div className="w-[560px] mx-auto flex flex-col gap-5">
      <div className="w-[400px]">
        <h1 className="text-4xl font-medium mb-3">Verify information</h1>
        <p className="text-[17px] leading-6">
          To create your account, we need some basic information
        </p>
      </div>
      <div className="flex gap-4">
        <div className="flex justify-center items-center bg-black rounded-sm w-20 h-20">
          <img src={gitHubIcon} alt="GitHub Icon" className="w-11 h-11" />
        </div>
        <Input title="GitHub Account" placeholder="surname" />
      </div>
      <hr className="border-border border border-opacity-35" />
      <Input title="Personal Email" placeholder="noyinoyi@gmail.com" />
      <Input title="Telegram" placeholder="Enter your Telegram username" />

      <div className="flex gap-4">
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
          Continue
        </Button>
      </div>
    </div>
  );
};
