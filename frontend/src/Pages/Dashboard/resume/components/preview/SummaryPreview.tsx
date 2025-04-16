import { ResumeInfo } from "../../../../../context/ResumeContextInfo"

interface SummaryPreviewProps {
    resumeInfo: ResumeInfo;
}

function SummaryPreview({ resumeInfo }: SummaryPreviewProps) {
  return (
    <p className='text-xs'>
      {resumeInfo?.summary}
    </p>
  )
}

export default SummaryPreview