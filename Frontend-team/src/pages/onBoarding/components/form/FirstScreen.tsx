import {  Dispatch, SetStateAction, useState } from "react";
// import { OnboardingButton } from "../..";
import { Button } from "@/components/ui/button";
import personIcon from "../../../../assets/icons/person.svg"
import maintainerIcon from "../../../../assets/icons/maintainer.svg"
import { OnboardingButton } from "../OnboardingCTAButton";
interface FirstScreenProps {
  firstIndex: number; // The current index for navigation
  setFirstIndex: Dispatch<SetStateAction<number>>; // Function to update the index
  // personIcon: ReactNode; // Icon for the "Contributor" option
  // maintainerIcon: ReactNode; // Icon for the "Maintainer" option
}

/**
 * FirstScreen component.
 *
 * This component renders the first screen of the onboarding flow.
 * It renders a brief overview, a list of two options, and a call-to-action button.
 *
 * The component is responsive and scales according to the screen size.
 *
 * @param {FirstScreenProps} props The component props
 * @returns {JSX.Element} The component JSX
 */
export const FirstScreen: React.FC<FirstScreenProps> = ({
  firstIndex,
  setFirstIndex,
  // personIcon,
  // maintainerIcon,
}) => {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="w-[560px] mx-auto flex flex-col gap-7">
      <div className="w-[400px]">
        <h1 className="text-4xl font-medium mb-3">Set up your profile</h1>
        <p className="text-[17px] leading-6">
          To get started, help us understand your main reason for joining Eth
          Open Source
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <OnboardingButton
          icon={personIcon}
          active={active}
          onClick={() => setActive("contributor")}
          name="contributor"
          title="Sign up as a Contributor"
          desc="Create a portfolio to discover open source projects, join amazing ethereum ecosystems and help them grow."
        />
        <OnboardingButton
          icon={maintainerIcon}
          active={active}
          onClick={() => setActive("maintainer")}
          name="maintainer"
          title="Sign up as a Maintainer"
          desc="Create and maintain open source ethereum projects and find qualified contributors to join your team."
        />
      </div>
      <div>
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
