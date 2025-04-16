import { useContext, useEffect, useState } from "react"
import { ResumeInfoContext } from "../../../../../context/ResumeContextInfo"
import { Input } from "../../../../../components/ui/input"
import { Button } from "../../../../../components/ui/button"
import { useParams } from "react-router-dom"
import GlobalApi from "../../../../../../service/GlobalApi"
import { LoaderCircle } from "lucide-react"

interface PersonalDetailsFormProps {
    enabledNext: (value: boolean) => void;
}

function PersonalDeatailsForm({ enabledNext }: PersonalDetailsFormProps) {
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("Params:", params);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        enabledNext(false);
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (setResumeInfo && resumeInfo) {
            setResumeInfo({
                ...resumeInfo,
                [name]: value
            });
        }
    };

    const onSave = (e: React.FormEvent) => {
        e.preventDefault();

        if (!params?.resumeId) {
            console.error("Resume ID is missing!");
            return;
        }

        setLoading(true);

        const data = {
            data: formData
        };

        console.log("Data being sent:", data);

        GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
            resp => {
                console.log(resp);
                enabledNext(true);
                setLoading(false);
            },
            error => {
                console.error(error);
                setLoading(false);
                enabledNext(true);
            }
        );
    };

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="font-bold text-lg">Personal Details</h2>
            <p>Add Your Personal Details</p>
            <form onSubmit={onSave} className="mt-5 flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-5">
                    <Input
                        placeholder="First Name"
                        name="firstName"
                        value={formData.firstName || resumeInfo?.firstName || ""}
                        onChange={handleInputChange}
                    />
                    <Input
                        placeholder="Last Name"
                        name="lastName"
                        value={formData.lastName || resumeInfo?.lastName || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <Input
                    placeholder="Job Title"
                    name="jobTitle"
                    value={formData.jobTitle || resumeInfo?.jobTitle || ""}
                    onChange={handleInputChange}
                />
                <Input
                    placeholder="Address"
                    name="address"
                    value={formData.address || resumeInfo?.address || ""}
                    onChange={handleInputChange}
                />
                <div className="grid grid-cols-2 gap-5">
                    <Input
                        placeholder="Phone"
                        name="phone"
                        value={formData.phone || resumeInfo?.phone || ""}
                        onChange={handleInputChange}
                    />
                    <Input
                        placeholder="Email"
                        name="email"
                        value={formData.email || resumeInfo?.email || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <Button type="submit" disabled={loading}>
                    {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
                </Button>
            </form>
        </div>
    );
}

export default PersonalDeatailsForm;