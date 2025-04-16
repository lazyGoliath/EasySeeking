import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormsSection from "../../components/FormsSection";
import ResumePreview from "../../components/ResumePreview";
import { ResumeInfoContext, ResumeInfo } from "../../../../../context/ResumeContextInfo";
import dummy from "../../../../../data/dummy";

function EditResume() {
    const params = useParams();
    const [resumeInfo, setResumeInfo] = useState<ResumeInfo | null>(null);

    useEffect(() => {
        console.log(params);
        console.log(params.resumeId);
        setResumeInfo(dummy);
    }, []);

    return (
        <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
            <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
                {/* Forms Section */}
                <FormsSection resumeInfo={resumeInfo}/>

                {/* Preview Section */}
                <ResumePreview/>
            </div>
        </ResumeInfoContext.Provider>
    );
}

export default EditResume;