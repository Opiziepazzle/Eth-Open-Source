import { Dispatch, SetStateAction } from "react";
import Input from "../Input";
import TextArea from "../TextArea";
import { Button } from "@/components/ui/button";

interface ThirdScreenProps {
  firstIndex: number; // The current step index in the onboarding process
  setFirstIndex: Dispatch<SetStateAction<number>>; // Function to update the step index
}

/**
 * ThirdScreen component.
 *
 * This component renders the third screen of the onboarding flow.
 * It renders a brief overview, two inputs for the user's first name and last name,
 * a text area for the biography, an input for the website, and a call-to-action button.
 *
 * The component is responsive and scales according to the screen size.
 *
 * @param {ThirdScreenProps} props The component props
 * @returns {JSX.Element} The component JSX
 */
export const ThirdScreen: React.FC<ThirdScreenProps> = ({
  firstIndex,
  setFirstIndex,
}) => {
//   const [active, setActive] = useState<string | null>(null);

  return (
    <div className="w-[560px] mx-auto flex flex-col gap-5">
      <div className="w-[400px]">
        <h1 className="text-4xl font-medium mb-3">Complete Your Profile 1/4</h1>
        <p className="text-[17px] leading-6">
          Provide additional information to help maintainers better match you
          with suitable projects.
        </p>
      </div>
      <div className="flex gap-4">
        <Input title="First Name" placeholder="Enter your first name" />
        <Input title="Last Name" placeholder="Enter your last name" />
      </div>

      <TextArea title="Biography" placeholder="Tell us about yourself" />
      <Input title="Website" placeholder="Add a link to your website" />

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
