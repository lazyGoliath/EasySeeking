import { useUser } from "@clerk/clerk-react"
import GlobalApi from "../../../service/GlobalApi"
import AddResume from "./components/AddResume"
import { useEffect, useState } from "react";
import ResumeCardItem from "./components/ResumeCardItem";

function DashboardPage() {

    const { user } = useUser();

    const [resumeList, setResumeList] = useState([]);

    //executes only when a valid user id logged in
    useEffect(() => {
        user && GetUserResumeList();
    }, [user]);

    //Used to get user's resume list filtered on user email
    const GetUserResumeList = () => {
        GlobalApi.GetUserResume(user?.primaryEmailAddress?.emailAddress)
        .then(resp => {
            console.log(resp)
            console.log(resp.data)
            
            console.log(resp.data.data)
            console.log(resp.data.data[0])
            console.log(resp.data.data[0].createdAt)
            setResumeList(resp.data.data)
        })
    }
    return (
        <div className="p-10 md:px-20 lg:px-32">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
                <AddResume/>
                {/* && added as it may cause error due to latency in fetching data from backend */}
                {resumeList.length>0 && resumeList.map((resume, index) => (
                    <ResumeCardItem key={index} resume={resume}/>
                ))}
            </div>
        </div>
    )
}

export default DashboardPage