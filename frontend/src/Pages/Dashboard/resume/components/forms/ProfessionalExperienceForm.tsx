import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import RichTextEditor from "../RichTextEditor";
import { Input } from "../../../../../components/ui/input";
import { ResumeInfoContext } from "../../../../../context/ResumeContextInfo";

interface ProfessionalExperienceFormProps {
    enabledNext: (value: boolean) => void;
}

interface ExperienceEntry {
    id: number;
    positionTitle: string;
    companyName: string;
    city: string;
    state: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    workSummary: string;
}

const formField: ExperienceEntry = {
    id: 0,
    positionTitle: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    workSummary: '',
};

function ProfessionalExperienceForm({ enabledNext }: ProfessionalExperienceFormProps) {
    const [experienceList, setExperienceList] = useState<ExperienceEntry[]>([]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (resumeInfo?.experience) {
            setExperienceList(resumeInfo.experience);
        }
    }, []);

    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newEntries = [...experienceList];
        const { name, value } = event.target;
        newEntries[index] = {
            ...newEntries[index],
            [name]: value
        };
        setExperienceList(newEntries);
    };

    const AddNewExperience = () => {
        setExperienceList([...experienceList, {
            ...formField,
            id: experienceList.length
        }]);
    };

    const RemoveExperience = () => {
        setExperienceList(experienceList => experienceList.slice(0, -1));
    };

    const handleRichTextEditor = (e: React.ChangeEvent<HTMLTextAreaElement>, name: string, index: number) => {
        const newEntries = [...experienceList];
        newEntries[index] = {
            ...newEntries[index],
            [name]: e.target.value
        };
        setExperienceList(newEntries);
    };

    useEffect(() => {
        if (setResumeInfo && resumeInfo) {
            setResumeInfo({
                ...resumeInfo,
                experience: experienceList
            });
        }
    }, [experienceList]);

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                experience: experienceList.map(({ id, ...rest }) => rest)
            }
        };

        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
            resp => {
                console.log(resp);
                setLoading(false);
                enabledNext(true);
            },
            error => {
                console.error(error);
                setLoading(false);
            }
        );
    };

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="font-bold text-lg">Professional Experience</h2>
            <p>Add Your Professional Experience</p>
            <div className="mt-5">
                {experienceList.map((experience, index) => (
                    <div key={index} className="mb-5 p-4 border rounded-lg">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <Input
                                placeholder="Position Title"
                                name="positionTitle"
                                value={experience.positionTitle}
                                onChange={(e) => handleChange(index, e)}
                            />
                            <Input
                                placeholder="Company Name"
                                name="companyName"
                                value={experience.companyName}
                                onChange={(e) => handleChange(index, e)}
                            />
                            <Input
                                placeholder="City"
                                name="city"
                                value={experience.city}
                                onChange={(e) => handleChange(index, e)}
                            />
                            <Input
                                placeholder="State"
                                name="state"
                                value={experience.state}
                                onChange={(e) => handleChange(index, e)}
                            />
                            <Input
                                placeholder="Start Date"
                                name="startDate"
                                value={experience.startDate}
                                onChange={(e) => handleChange(index, e)}
                            />
                            <Input
                                placeholder="End Date"
                                name="endDate"
                                value={experience.endDate}
                                onChange={(e) => handleChange(index, e)}
                            />
                        </div>
                        <div className="mb-4">
                            <RichTextEditor
                                index={index}
                                defaultValue={experience.workSummary}
                                onRichTextEditorChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleRichTextEditor(event, 'workSummary', index)}
                            />
                        </div>
                    </div>
                ))}
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <Button type="button" onClick={AddNewExperience}>
                            Add Experience
                        </Button>
                        {experienceList.length > 1 && (
                            <Button type="button" variant="outline" onClick={RemoveExperience}>
                                Remove Last
                            </Button>
                        )}
                    </div>
                    <Button onClick={onSave} disabled={loading}>
                        {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProfessionalExperienceForm;