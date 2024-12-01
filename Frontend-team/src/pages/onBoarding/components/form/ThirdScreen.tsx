import { Dispatch, SetStateAction } from "react";
import Input from "../Input";
import TextArea from "../TextArea";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import formStyles from "./formStyles";

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
const { user } = useSelector((state: RootState) => state.auth);
const navigate = useNavigate()

  return (
    <div className={formStyles.container}>
      <div className={formStyles.headWrapper}> 
          <h1 className={formStyles.title}>Complete Your Profile 1/4</h1>
        <div className={formStyles.descWrapper}>
          <p className={formStyles.desc}>
            Provide additional information to help maintainers better match you
            with suitable projects.
          </p>
          <button className={formStyles.skip} onClick={() => navigate("/dashboard")}>Skip</button>
        </div>

      </div>
      <div className="flex gap-4 max-sm:flex-col max-sm:gap-7">
        <Input title="First Name" placeholder="Enter your first name" value={user?.displayName?.split(" ")[0]} />
        <Input title="Last Name" placeholder="Enter your last name" value={user?.displayName?.split(" ")[1]}/>
      </div>

      <TextArea title="Biography" placeholder="Tell us about yourself" />
      <Input title="Website" placeholder="Add a link to your website" />

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
