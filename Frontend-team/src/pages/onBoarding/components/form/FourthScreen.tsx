import { Dispatch, SetStateAction, useState } from "react";
import  { TagFields } from "../Input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import formStyles from "./formStyles";


interface FourthScreenProps {
  firstIndex: number; // The current step index in the onboarding process
  setFirstIndex: Dispatch<SetStateAction<number>>; // Function to update the step index
}

export const FourthScreen: React.FC<FourthScreenProps> = ({
  firstIndex,
  setFirstIndex,
}) => {
  const [skill, setSkill] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const navigate = useNavigate()


  return (
    <div className={formStyles.container}>
      <div className={formStyles.headWrapper}> 
          <h1 className={formStyles.title}>Complete Your Profile 2/4</h1>
        <div className={formStyles.descWrapper}>
          <p className={formStyles.desc}>
            Provide additional information to help maintainers better match you
            with suitable projects.
          </p>
          <button className={formStyles.skip} onClick={() => navigate("/dashboard")}>Skip</button>
        </div>
     
      </div>

      <TagFields
        skill={skill}
        setSkill={setSkill} 
        title="Skills"
      />
      <TagFields
        skill={goals}
        setSkill={setGoals} 
        title="Goals"
        
      />
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
