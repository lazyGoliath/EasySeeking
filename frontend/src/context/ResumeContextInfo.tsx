import { createContext } from "react";

export interface ResumeInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  address: string;
  phone: string;
  email: string;
  themeColor: string;
  summary: string;
  experience: {
    id: number;
    positionTitle: string;
    companyName: string;
    city: string;
    state: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    workSummary: string;
  }[];
  education: {
    id: number;
    universityName: string;
    degree: string;
    major: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  skills: {
    id: number;
    name: string;
    rating: number;
  }[];
}

interface ResumeContextType {
  resumeInfo: ResumeInfo | null;
  setResumeInfo: React.Dispatch<React.SetStateAction<ResumeInfo | null>>;
}

export const ResumeInfoContext = createContext<ResumeContextType>({
  resumeInfo: null,
  setResumeInfo: () => {}
});