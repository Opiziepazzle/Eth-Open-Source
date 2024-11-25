import { Dispatch, SetStateAction } from "react";
import Input from "../Input";
import { Button } from "@/components/ui/button";

interface FourthScreenProps {
  firstIndex: number; // The current step index in the onboarding process
  setFirstIndex: Dispatch<SetStateAction<number>>; // Function to update the step index
}

export const FourthScreen: React.FC<FourthScreenProps> = ({
  firstIndex,
  setFirstIndex,
}) => {
//   const [active, setActive] = useState<string | null>(null);

  return (
    <div className="w-[560px] mx-auto  flex flex-col gap-5">
      <div className="w-[400px]">
        <h1 className="text-4xl font-medium mb-3">Complete Your Profile 2/4</h1>
        <p className="text-[17px] leading-6">
          Provide additional information to help maintainers better match you
          with suitable projects.
        </p>
      </div>

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
