import { Timestamp } from "firebase/firestore";

export interface RegularUser {
  id: string;
  access: string;
  phoneNumber: string | null;
  verified: boolean;
  bookmarkedJobs: string[];
}

export interface Admin extends RegularUser {
  email: string | null;
  createdJobs: string[];
}

export interface Employer extends RegularUser {
  name: string | null;
  email: string | null;
  createdJobs: string[]; 
  address: string | null;
  company: string | null;
  website: string |
   null;
}

export interface Job {
  id: string;
  date: Timestamp;
  companyName: string;
  address: string;
  contactPerson: string;
  phone: string;
  jobPosition: string;
  languageRequirement: string;
  workingHours: string;
  probationPeriod: string;
  employeeBenefit: string;
  otherInfo: string;
  visible: object;
  category: string;
  salary: string;
}

export const jobInstance: Job = {
  id: '',
  date: new Timestamp(0, 0),
  companyName: '',
  address: '',
  contactPerson: '',
  phone: '',
  jobPosition: '',
  languageRequirement: '',
  workingHours: '',
  workingDays: '',
  salary: '',
  probationPeriod: '',
  employeeBenefit: '',
  otherInfo: '',
  visible: Object(),
  category: "",
}

export interface JobFormValues {
  date: string;
  companyName: string;
  address: string;
  contactPerson: string;
  phone: string;
  jobPosition: string;
  languageRequirement: string;
  workingHours: string;
  workingDays: string;
  salary: string;
  probationPeriod: string;
  employeeBenefit: string;
  category: string;
  otherInfo: string;
}
