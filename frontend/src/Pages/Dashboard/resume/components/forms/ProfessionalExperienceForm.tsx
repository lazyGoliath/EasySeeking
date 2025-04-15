import { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "../../../../../context/ResumeContextInfo";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import RichTextEditor from "../RichTextEditor";
import { Input } from "../../../../../components/ui/input";


const formField={
    id:0,
    positionTitle:'',
    companyName:'',
    city:'',
    state:'',
    startDate:'',
    endDate:'',
    currentlyWorking: false,
    workSummary:'',

}

function ProfessionalExperienceForm({enabledNext}) {
  

    const [experinceList,setExperinceList]=useState<typeof formField[]>([]);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const params=useParams();
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        console.log("Printing resumeInfo experience from forms section : ", resumeInfo?.experience);
        resumeInfo?.experience.length>0&&setExperinceList(resumeInfo?.experience)
        
    },[])

    const handleChange=(index,event)=>{
        const newEntries=experinceList.slice();
        const {name,value}=event.target;
        newEntries[index][name]=value;
        console.log("Newly Entered Experience : ", newEntries)
        setExperinceList(newEntries);
    }

    const AddNewExperience=()=>{
        setExperinceList([...experinceList,{
            positionTitle:'',
            companyName:'',
            city:'',
            state:'',
            startDate:'',
            endDate:'',
            workSummary:'',
        }])
        console.log("Adding New Experience : ", experinceList)
    }

    const RemoveExperience=()=>{
        setExperinceList(experinceList=>experinceList.slice(0,-1))
        console.log("Removing Experience : ", experinceList)
    }

    const handleRichTextEditor=(e,name,index)=>{
        const newEntries=experinceList.slice();
        newEntries[index][name]=e.target.value;
       
        setExperinceList(newEntries);
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            experience:experinceList
        });
     
    },[experinceList]);


    const onSave=()=>{
        setLoading(true)
        const data={
            data:{
                experience:experinceList.map(({ id, ...rest }) => rest)
            }
        }

        console.log("Saving payload:", JSON.stringify(data, null, 2));

        GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(res=>{
            console.log(res);
            setLoading(false);
            //toast('Details updated !')
        },(error)=>{
            setLoading(false);
        })

    }
  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
            {experinceList.map((item,index)=>(
                <div key={index}>
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div>
                            <label className='text-xs'>Position Title</label>
                            <Input name="positionTitle" 
                            onChange={(event)=>handleChange(index,event)}
                            />
                        </div>
                        <div>
                            <label className='text-xs'>Company Name</label>
                            <Input name="companyName" 
                            onChange={(event)=>handleChange(index,event)}
                            />
                        </div>
                        <div>
                            <label className='text-xs'>City</label>
                            <Input name="city" 
                            onChange={(event)=>handleChange(index,event)} 
                            />
                        </div>
                        <div>
                            <label className='text-xs'>State</label>
                            <Input name="state" 
                            onChange={(event)=>handleChange(index,event)}
                             />
                        </div>
                        <div>
                            <label className='text-xs'>Start Date</label>
                            <Input type="date"  
                            name="startDate" 
                            onChange={(event)=>handleChange(index,event)} 
                            />
                        </div>
                        <div>
                            <label className='text-xs'>End Date</label>
                            <Input type="date" name="endDate" 
                            onChange={(event)=>handleChange(index,event)} 
                            />
                        </div>
                        <div className='col-span-2'>
                           {/* Work Summary  */}
                           <RichTextEditor
                           index={index}
                           onRichTextEditorChange={(event)=>handleRichTextEditor(event,'workSummary',index)}  />
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewExperience} className="text-primary"> + Add More Experience</Button>
            <Button variant="outline" onClick={RemoveExperience} className="text-primary"> - Remove</Button>

            </div>
            <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>
        </div>
    </div>
  )
}

export default ProfessionalExperienceForm