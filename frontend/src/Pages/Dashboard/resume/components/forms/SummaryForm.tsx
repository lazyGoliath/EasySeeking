import { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "../../../../../context/ResumeContextInfo";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../service/GlobalApi";
import { Brain, LoaderCircle } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { Textarea } from "../../../../../components/ui/textarea";
import { AIChatSession } from "../../../../../../service/AiModel";

const prompt="Generate a JSON array of {jobTitle} job role summaries for the following experience levels: 1. Entry-level (Freshers) 2. Mid-level 3. Senior-level. For each experience level, provide the following fields: - experience_level: The title of the experience level (e.g., 'Entry-level', 'Mid-level', 'Senior-level'). - summary: A brief 3-4 line description of the key responsibilities, skills, and qualifications expected at that experience level. The output should be in JSON format: [{ 'experience_level': 'Entry-level', 'summary': 'A fresh graduate or early professional with a focus on learning key skills and assisting in daily tasks. Responsibilities may include basic research, data collection, and shadowing senior colleagues.' }, { 'experience_level': 'Mid-level', 'summary': 'An individual with 3-5 years of experience who handles more independent tasks and contributes to project management. Expected to have proficiency in relevant tools and methodologies.' }, { 'experience_level': 'Senior-level', 'summary': 'An experienced professional with 7+ years in the field, responsible for leading projects, mentoring junior staff, and making strategic decisions. Requires deep expertise and leadership skills.' }]"
function SummaryForm({enabledNext}) {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [summary,setSummary]=useState();
    const [loading,setLoading]=useState(false);
    const params=useParams();
    const [aiGeneratedSummaryList,setAiGenerateSummaryList]=useState();
    useEffect(()=>{
        summary&&setResumeInfo({
            ...resumeInfo,
            summary:summary
        })
    },[summary])

    const GenerateSummaryFromAI=async()=>{
        setLoading(true)
        const PROMPT=prompt.replace('{jobTitle}',resumeInfo?.jobTitle);
        console.log(PROMPT);
        const result=await AIChatSession.sendMessage(PROMPT);
        console.log("Parsed Response : " + JSON.parse(result.response.text()))
       
        setAiGenerateSummaryList(JSON.parse(result.response.text()))
        setLoading(false);
    }

    const onSave=(e)=>{

        console.log("SUBMITTING THE SUMMARY FORM : "+summary);
        e.preventDefault();
       
        setLoading(true)
        const data={
            data:{
                summary:summary
            }
        }
        GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(resp=>{
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            //toast("Details updated")
        },(error)=>{
            setLoading(false);
        })
    }
    return (
    <div>
         <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summary</h2>
        <p>Add Summary for your job title</p>

        <form className='mt-7' onSubmit={onSave}>
            <div className='flex justify-between items-end'>
                <label>Add Summary</label>
                <Button variant="outline" onClick={()=>GenerateSummaryFromAI()} 
                type="button" size="sm" className="border-primary text-primary flex gap-2"> 
                <Brain className='h-4 w-4' />  Generate from AI</Button>
            </div>
            <Textarea className="mt-5" required
            value={summary}
                defaultValue={summary?summary:resumeInfo?.summary}
            onChange={(e)=>setSummary(e.target.value)}
            />
            <div className='mt-2 flex justify-end'>
            <Button type="submit"
                disabled={loading}>
                    {loading?<LoaderCircle className='animate-spin' />:'Save'}
                    </Button>
            </div>
        </form>
        </div>

        
       {aiGeneratedSummaryList&& <div className='my-5'>
            <h2 className='font-bold text-lg'>Suggestions</h2>
            {aiGeneratedSummaryList?.map((item:any,index:number)=>(
                <div key={index} 
                onClick={()=>setSummary(item?.summary)}
                className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                    <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                    <p>{item?.summary}</p>
                </div>
            ))}
        </div>}

    </div>
  )
}


export default SummaryForm