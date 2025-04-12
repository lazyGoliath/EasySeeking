import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react"
import { Button } from "../../../../components/ui/button"
import EducationForm from "./forms/EducationForm"
import PersonalDeatailsForm from "./forms/PersonalDeatailsForm"
import ProfessionalExperienceForm from "./forms/ProfessionalExperienceForm"
import SkillsForm from "./forms/SkillsForm"
import SummaryForm from "./forms/SummaryForm"
import { useState } from "react"

function FormsSection({resumeInfo}:{resumeInfo:any}) {

  const [ activeFormIndex, setActiveFromIndex ] = useState(1);

  const [ enableNext, setEnableNext ] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center">
        <Button variant={"outline"} size={"sm"} className="flex gap-2"> <LayoutGrid /> Theme</Button>
        <div className="flex gap-5">
          {activeFormIndex>1 && <Button size={"sm"} onClick={() => setActiveFromIndex(activeFormIndex-1)}>
            <ArrowLeft/>
          </Button>}
          <Button className="flex gap-2" size={"sm"} disabled={!enableNext}
            onClick={() => setActiveFromIndex(activeFormIndex+1)}>
            <ArrowRight/>
          </Button>
        </div>
      </div>
      {/* Personal Detail  */}
      {activeFormIndex==1 ? <PersonalDeatailsForm enabledNext={(v) =>setEnableNext(v)} /> : null}

      {/* Summary */}
      {activeFormIndex==2 ? <SummaryForm /> : null}

      {/* Professional Experience */}
      {activeFormIndex==3 ? <ProfessionalExperienceForm /> : null}

      {/* Education */}
      {activeFormIndex==4 ? <EducationForm /> : null}

      {/* Skills */}
      {activeFormIndex==5 ? <SkillsForm /> : null}
    </div>
  )
}

export default FormsSection