import { PlusSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "C:/Users/HP/OneDrive/Documents/backupDocs/dev/AI-resume/EasySeeking/frontend/src/components/ui/dialog.tsx";
import { Input } from "C:/Users/HP/OneDrive/Documents/backupDocs/dev/AI-resume/EasySeeking/frontend/src/components/ui/input.tsx";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { v4 as uuidv4 } from 'uuid';

function AddResume() {

  const [openDialog, setOpenDialog] = useState(false);
  const [ resumeTitle, setResumeTitle ] = useState<string | undefined>(undefined);

  const onCreate = () => {
    const uuid = uuidv4();
    console.log(resumeTitle,uuid);
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
              <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button disabled={!resumeTitle} onClick={() => onCreate()}
                className="bg-[#9f5bff]"
                >Create Resume</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
