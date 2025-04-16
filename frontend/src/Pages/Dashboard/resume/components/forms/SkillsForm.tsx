import { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../service/GlobalApi";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import { ResumeInfoContext } from "../../../../../context/ResumeContextInfo";

interface SkillsFormProps {
    enabledNext: (value: boolean) => void;
}

interface SkillEntry {
    id: number;
    name: string;
    rating: number;
}

function SkillsForm({ enabledNext }: SkillsFormProps) {
    const [skillsList, setSkillsList] = useState<SkillEntry[]>([
        {
            id: 0,
            name: "",
            rating: 0,
        },
    ]);
    const { resumeId } = useParams();
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    useEffect(() => {
        if (resumeInfo?.skills) {
            setSkillsList(resumeInfo.skills);
        }
    }, []);

    const handleChange = (index: number, name: string, value: string | number) => {
        const newEntries = [...skillsList];
        newEntries[index] = {
            ...newEntries[index],
            [name]: value
        };
        setSkillsList(newEntries);
    };

    const AddNewSkills = () => {
        setSkillsList([
            ...skillsList,
            {
                id: skillsList.length,
                name: "",
                rating: 0,
            },
        ]);
    };

    const RemoveSkills = () => {
        setSkillsList(skillsList => skillsList.slice(0, -1));
    };

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                skills: skillsList.map(({ id, ...rest }) => rest),
            },
        };

        GlobalApi.UpdateResumeDetail(resumeId, data).then(
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
                skills: skillsList,
            });
        }
    }, [skillsList]);

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="font-bold text-lg">Skills</h2>
            <p>Add Your Skills</p>
            <div className="mt-5">
                {skillsList.map((skill, index) => (
                    <div key={index} className="mb-5 p-4 border rounded-lg">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <Input
                                placeholder="Skill Name"
                                name="name"
                                value={skill.name}
                                onChange={(e) => handleChange(index, "name", e.target.value)}
                            />
                            <div className="flex items-center gap-2">
                                <span className="text-sm">Rating:</span>
                                <Rating
                                    value={skill.rating}
                                    onChange={(v: number) => handleChange(index, "rating", v)}
                                    style={{ maxWidth: 150 }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <Button type="button" onClick={AddNewSkills}>
                            Add Skill
                        </Button>
                        {skillsList.length > 1 && (
                            <Button type="button" variant="outline" onClick={RemoveSkills}>
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

export default SkillsForm;
