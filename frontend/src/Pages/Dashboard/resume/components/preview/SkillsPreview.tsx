import { ResumeInfo } from "../../../../../context/ResumeContextInfo"

interface SkillsPreviewProps {
    resumeInfo: ResumeInfo;
}

function SkillsPreview({ resumeInfo }: SkillsPreviewProps) {
  return (
    <div className="my-5">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Skills
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      <div className='grid grid-cols-2 gap-3 my-3'>
      {resumeInfo?.skills.map((skills: any, index: number) => {
        return (
          <div key={index} className="my-3 flex items-center justify-between">
            <h2 className="text-sm font-bold">
              {skills?.name}
            </h2>
            {/* PROGRESS BAR */}
            <div className='h-2 bg-gray-200 w-[120px] rounded-lg'>
              {/* BAR TO SHOW ACTUAL PROGRESS */}
              <div className='h-2 rounded-lg'
                style={{
                  backgroundColor:resumeInfo?.themeColor,
                  width:skills?.rating+'%'
                }}></div>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  )
}

export default SkillsPreview