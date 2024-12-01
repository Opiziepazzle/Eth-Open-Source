import { useEffect, useState } from "react";
// import { OnboardingButton } from "../..";
import { Button } from "@/components/ui/button";
import personIcon from "../../../../assets/icons/person.svg"
import maintainerIcon from "../../../../assets/icons/maintainer.svg"
import { OnboardingButton } from "../OnboardingCTAButton";
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { loginWithGitHub } from "@/store/actions/auth";
import { FirstScreenProps } from "../types";
import formStyles from "./formStyles";


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
}) => {
  const [active, setActive] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user)
  useEffect(() => {
    if (user) {
      setFirstIndex(firstIndex + 1);
    }
  }, [user])

  
  return (
    <div className={formStyles.container}>
      <div className={formStyles.headWrapper}>
        <h1 className={formStyles.title}>Set up your profile</h1>
        <p className={formStyles.desc}>
          To get started, help us understand your main reason for joining Eth
          Open Source
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <OnboardingButton
          icon={personIcon}
          active={active}
          size="big"
          onClick={() => {setActive("contributor"); dispatch(loginWithGitHub())}}
          name="contributor"
          title="Sign up as a Contributor"
          desc="Create a portfolio to discover open source projects, join amazing ethereum ecosystems and help them grow."
        />
        <OnboardingButton
          icon={maintainerIcon}
          active={active}
          size="big"
          onClick={() => {setActive("maintainer"); dispatch(loginWithGitHub())}}
          name="maintainer"
          title="Sign up as a Maintainer"
          desc="Create and maintain open source ethereum projects and find qualified contributors to join your team."
        />
      </div>
      <div>
        <Button
          onClick={() => setFirstIndex(firstIndex + 1)}
          variant={"secondary"}
          disabled={user === null}
          className="w-full p-6 rounded-full font-normal text-base"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
