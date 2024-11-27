import { Dispatch, SetStateAction, useState } from "react";
// import { OnboardingButton } from "../..";
import { Button } from "@/components/ui/button";
import personIcon from "../../../../assets/icons/person.svg"
import maintainerIcon from "../../../../assets/icons/maintainer.svg"
import { OnboardingButton } from "../OnboardingCTAButton";
import { useNavigate } from "react-router-dom";
import formStyles from "./formStyles";

interface SixthScreenProps {
  firstIndex: number; // The current step index in the onboarding process
  setFirstIndex: Dispatch<SetStateAction<number>>; // Function to update the step index
//   personIcon: ReactNode; // Icon to be used for the onboarding buttons
}

/**
 * SixthScreen component.
 *
 * This component renders the sixth screen of the onboarding flow.
 * It renders a brief overview, three options (Beginner, Intermediate, Advanced) and a call-to-action button.
 *
 * The component is responsive and scales according to the screen size.
 *
 * @param {SixthScreenProps} props The component props
 * @returns {JSX.Element} The component JSX
 */
export const SixthScreen: React.FC<SixthScreenProps> = ({
  firstIndex,
  setFirstIndex,
}) => {
  const [active, setActive] = useState<string | null>(null);
  const navigate = useNavigate();
  return (
    <div className={formStyles.container}>
      <div className={formStyles.headWrapper}> 
          <h1 className={formStyles.title}>Complete Your Profile 4/4</h1>
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
          title="I’m a Beginner"
          desc="Create a portfolio to discover open source projects."
        />
        <OnboardingButton
          icon={maintainerIcon}
          active={active}
          size="small"
          onClick={() => setActive("non-tech")}
          name="non-tech"
          title="I’m an Intermediate"
          desc="Create and maintain open source ethereum projects."
        />
        <OnboardingButton
          icon={maintainerIcon}
          active={active}
          size="small"
          onClick={() => setActive("non-teche")}
          name="non-teche"
          title="I’m an Intermediate"
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
          onClick={() => {setFirstIndex(firstIndex + 1);  navigate("/dashboard")}}
          variant={"secondary"}
          className="w-full p-6 rounded-full font-normal text-base"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};
