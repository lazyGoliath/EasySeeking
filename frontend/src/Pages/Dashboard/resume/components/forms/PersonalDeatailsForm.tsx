import { useContext, useEffect, useState } from "react"
import { ResumeInfoContext } from "../../../../../context/ResumeContextInfo"
import { Input } from "../../../../../components/ui/input"
import { Button } from "../../../../../components/ui/button"
import { useParams } from "react-router-dom"
import GlobalApi from "C:/Users/HP/OneDrive/Documents/backupDocs/dev/AI-resume/EasySeeking/frontend/service/GlobalApi.js"
import { LoaderCircle } from "lucide-react"

function PersonalDeatailsForm({enabledNext}) {

  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [ formData, setFormData ] = useState()
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    console.log("Params:", params);
  }, []);

  const handleInputChange = (e: { target: { name: any; value: any } }) =>{

    enabledNext(false)

    const {name, value} = e.target;

    // console.log(name, value)
    setFormData({
      ...formData,
      [name]: value
    })

    setResumeInfo({
      ...resumeInfo,
      [name]:value
    })
  }
  const onSave = (e) => {
    e.preventDefault();

    if (!params?.resumeId) {
      console.error("Resume ID is missing!");
      return;
    }

    setLoading(true)

    const data = {
      data:formData
    }

    console.log("Data being sent:", data);

    GlobalApi.UpdateResumeDetail(params.resumeId,data).then(resp=>{
      console.log(resp)
      enabledNext(true)
      setLoading(false)
    },(error)=>{
      setLoading(false)
      enabledNext(true)
    })
  }

  return (
    <div className="p5- shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="text-lg font-bold">Personal Deatails</h2>
      <p>Get started with the basic information.</p>
      <form onSubmit={onSave} action="#">
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input name="firstName" required onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input name="lastName" required onChange={handleInputChange} />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input name="jobTitle" required onChange={handleInputChange} />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input name="address" required onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input name="phone" required onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input name="email" required onChange={handleInputChange} />
          </div>
        </div>
        <div className="mt-3 flex justify-end p-2">
          <Button type="submit" disabled={loading}>
            {loading? <LoaderCircle className="animate-spin"/> : 'Save'}</Button>
        </div>
      </form>
    </div>

  )
}

export default PersonalDeatailsForm