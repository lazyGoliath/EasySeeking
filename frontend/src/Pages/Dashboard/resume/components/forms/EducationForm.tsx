import { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "../../../../../context/ResumeContextInfo";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { Textarea } from "../../../../../components/ui/textarea";
//import { AIChatSession } from "../../../../../../service/AiModel";
import { Input } from "../../../../../components/ui/input";

interface EducationFormProps {
    enabledNext: (value: boolean) => void;
}

interface EducationEntry {
    id: number;
    universityName: string;
    degree: string;
    major: string;
    startDate: string;
    endDate: string;
    description: string;
}

function EducationForm({ enabledNext }: EducationFormProps) {
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [educationalList, setEducationalList] = useState<EducationEntry[]>([
        {
            id: 0,
            universityName: "",
            degree: "",
            major: "",
            startDate: "",
            endDate: "",
            description: "",
        },
    ]);

    useEffect(() => {
        if (resumeInfo?.education) {
            setEducationalList(resumeInfo.education);
        }
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const newEntries = [...educationalList];
        const { name, value } = event.target;
        newEntries[index] = {
            ...newEntries[index],
            [name]: value
        };
        setEducationalList(newEntries);
    };

    const AddNewEducation = () => {
        setEducationalList([
            ...educationalList,
            {
                id: 0,
                universityName: "",
                degree: "",
                major: "",
                startDate: "",
                endDate: "",
                description: "",
            },
        ]);
    };

    const RemoveEducation = () => {
        setEducationalList(educationalList => educationalList.slice(0, -1));
    };

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                education: educationalList.map(({ id, ...rest }) => rest),
            },
        };

        GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
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

    useEffect(() => {
        if (setResumeInfo && resumeInfo) {
            setResumeInfo({
                ...resumeInfo,
                education: educationalList,
            });
        }
    }, [educationalList]);

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="font-bold text-lg">Educational Info</h2>
            <p>Add Your educational details</p>
            <div className="mt-5">
                {educationalList.map((education, index) => (
                    <div key={index} className="mb-5 p-4 border rounded-lg">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <Input
                                placeholder="University Name"
                                name="universityName"
                                value={education.universityName}
                                onChange={(e) => handleChange(e, index)}
                            />
                            <Input
                                placeholder="Degree"
                                name="degree"
                                value={education.degree}
                                onChange={(e) => handleChange(e, index)}
                            />
                            <Input
                                placeholder="Major"
                                name="major"
                                value={education.major}
                                onChange={(e) => handleChange(e, index)}
                            />
                            <Input
                                placeholder="Start Date"
                                name="startDate"
                                value={education.startDate}
                                onChange={(e) => handleChange(e, index)}
                            />
                            <Input
                                placeholder="End Date"
                                name="endDate"
                                value={education.endDate}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>
                        <Textarea
                            placeholder="Description"
                            name="description"
                            value={education.description}
                            onChange={(e) => handleChange(e, index)}
                            className="mb-4"
                        />
                    </div>
                ))}
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <Button type="button" onClick={AddNewEducation}>
                            Add Education
                        </Button>
                        {educationalList.length > 1 && (
                            <Button type="button" variant="outline" onClick={RemoveEducation}>
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

export default EducationForm;
