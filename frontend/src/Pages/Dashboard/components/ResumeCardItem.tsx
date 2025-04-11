import { Notebook } from "lucide-react"
import { Link } from "react-router-dom"

function ResumeCardItem({ resume }: { resume: any }) {
    return (
        <div>
            <Link to={'/dashboard/resume/:'+resume.resumeId+'/edit'}>
                <div className="p-14 bg-secondary items-center flex justify-center h-[280px] rounded-lg border border-primary
                    hover:scale-105 transition-all hover:shadow-md shadow-primary cursor-pointer border-dashed">
                    <Notebook />
                </div>
                <h2 className="my-1 text-center">{resume.title}</h2>
            </Link>
        </div>
    )
}

export default ResumeCardItem