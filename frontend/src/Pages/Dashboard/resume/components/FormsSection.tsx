import { ArrowLeft, ArrowRight, LayoutGrid, Link } from "lucide-react"
import { Button } from "../../../../components/ui/button"
import EducationForm from "./forms/EducationForm"
import PersonalDeatailsForm from "./forms/PersonalDeatailsForm"
import ProfessionalExperienceForm from "./forms/ProfessionalExperienceForm"
import SkillsForm from "./forms/SkillsForm"
import SummaryForm from "./forms/SummaryForm"
import { useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import ThemeColor from "./ThemeColor"


function FormsSection({resumeInfo}:{resumeInfo:any}) {

  const [ activeFormIndex, setActiveFromIndex ] = useState(1);

  const [ enableNext, setEnableNext ] = useState(false);

  const {resumeId}=useParams();

  return (
    <div>
      <div className="flex justify-between items-center">
      <ThemeColor/>
        <div className="flex gap-5">
          {activeFormIndex>1 && <Button size={"sm"} onClick={() => setActiveFromIndex(activeFormIndex-1)}>
            <ArrowLeft/>
          </Button>}
          {activeFormIndex<5 ? <Button className="flex gap-2" size={"sm"} disabled={!enableNext}
            onClick={() => setActiveFromIndex(activeFormIndex+1)}>
            Next <ArrowRight/>
          </Button> : 
           <Button className="flex gap-2" size={"sm"} disabled={!enableNext}
           onClick={() => setActiveFromIndex(activeFormIndex+1)}>
           Download
         </Button>}
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
      {activeFormIndex==5 && <SkillsForm />}

      {activeFormIndex==6 && <Navigate to={'/my-resume/'+resumeId+"/view"} />}
    </div>
  )
}

export default FormsSection