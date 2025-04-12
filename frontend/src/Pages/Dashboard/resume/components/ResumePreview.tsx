import { useContext, useState } from "react"
import { ResumeInfoContext } from "../../../../context/ResumeContextInfo"
import PersonalDetailsPreview from "./preview/PersonalDetailsPreview"
import SummaryPreview from "./preview/SummaryPreview"
import ProfessionalExperiencePreview from "./preview/ProfessionalExperiencePreview"
import EducationPreview from "./preview/EducationPreview"
import SkillsPreview from "./preview/SkillsPreview"

function ResumePreview() {

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

  return (
    <div className="shadow-lg h-full p-14 border-t-[20px]"
    style={{
      borderColor:resumeInfo?.themeColor
    }}>
      {/* Personal Detail  */}
      <PersonalDetailsPreview resumeInfo={resumeInfo}/>

      {/* Summary */}
      <SummaryPreview resumeInfo={resumeInfo} />

      {/* Professional Experience */}
      <ProfessionalExperiencePreview resumeInfo={resumeInfo} />

      {/* Education */}
      <EducationPreview resumeInfo={resumeInfo} />

      {/* Skills */}
      <SkillsPreview resumeInfo={resumeInfo} />
    </div>
  )
}

export default ResumePreview