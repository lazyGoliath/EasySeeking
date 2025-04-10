import { Loader2, PlusSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "C:/Users/HP/OneDrive/Documents/backupDocs/dev/AI-resume/EasySeeking/frontend/src/components/ui/dialog.tsx";
import { Input } from "C:/Users/HP/OneDrive/Documents/backupDocs/dev/AI-resume/EasySeeking/frontend/src/components/ui/input.tsx";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from "C:/Users/HP/OneDrive/Documents/backupDocs/dev/AI-resume/EasySeeking/frontend/service/GlobalApi.js"
import { useUser } from "@clerk/clerk-react";

function AddResume() {

  const [openDialog, setOpenDialog] = useState(false);
  const [ resumeTitle, setResumeTitle ] = useState<string | undefined>(undefined);
  const { user } = useUser();
  const [ loading, setLoading ] = useState(false);

  const onCreate = () => {
    setLoading(true);
    const uuid = uuidv4();
    
    const data = {
      data: {
        title : resumeTitle,
        resumeId : uuid,
        userEmail : user?.primaryEmailAddress?.emailAddress,
        userName : user?.fullName
      }
    }
    GlobalApi.createNewResume(data).then(resp =>{
      console.log(resp)
      if(resp){
        setLoading(false);
      }
    },(error) =>{
      setLoading(false);
    });
  }

  return (
    <div>
      <div
        className="p-4 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] 
            hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a new title for your Resume</p>
              <Input className="my-2" placeholder="Eg. FullStack resume..."
              onChange={(e) => setResumeTitle(e.target.value)}/>
            </DialogDescription>
            <div className="flex justify-end gap-10">
              <Button variant="ghost" onClick={() => {setOpenDialog(false);}}>
                Cancel
              </Button>
              <Button disabled={!resumeTitle || loading} onClick={() => onCreate()} className="bg-[#9f5bff]">
                {loading? <Loader2 className="animate-spin" /> : "Create Resume"}
              </Button>
            </div>  
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
