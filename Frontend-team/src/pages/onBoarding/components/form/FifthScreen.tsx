import { Dispatch, SetStateAction, useState } from "react";
// import { OnboardingButton } from "../..";
import { Button } from "@/components/ui/button";
import personIcon from "../../../../assets/icons/person.svg"
import { OnboardingButton } from "../OnboardingCTAButton";
import { useNavigate } from "react-router-dom";
import formStyles from "./formStyles";
// import maintainerIcon from "../../assets/icons/maintainer.svg"

interface FifthScreenProps {
  firstIndex: number; // The current step index in the onboarding process
  setFirstIndex: Dispatch<SetStateAction<number>>; // Function to update the step index
//   personIcon: string; // URL or path to the person icon image
}

export const FifthScreen: React.FC<FifthScreenProps> = ({
  firstIndex,
  setFirstIndex,
}) => {
  const [active, setActive] = useState<string | null>(null);
  const navigate = useNavigate()

  return (
    <div className={formStyles.container}>

      <div className={formStyles.headWrapper}> 
          <h1 className={formStyles.title}>Complete Your Profile 3/4</h1>
        <div className={formStyles.descWrapper}>
          <p className={formStyles.desc}>
            Provide additional information to help maintainers better match you
            with suitable projects.
          </p>
          <button className={formStyles.skip} onClick={() => navigate("/dashboard")}>Skip</button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <OnboardingButton
          icon={personIcon}
          active={active}
          size="small"
          onClick={() => setActive("tech")}
          name="tech"
          title="I’m a Tech Bro"
          desc="Create a portfolio to discover open source projects."
        />

        <OnboardingButton
          icon={personIcon}
          active={active}
          size="small"
          onClick={() => setActive("non-tech")}
          name="non-tech"
          title="I’m a Non-Tech Bro"
          desc="Create and maintain open source ethereum projects."
        />
      </div>
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
