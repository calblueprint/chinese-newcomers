import { Timestamp } from 'firebase/firestore';

export interface User {
  id: string;
  access: string;
  createdJobs: string[]; // switched to string of jobIds to match Firebase
  email: string | null;
  bookmarkedJobs: string[]; // switched to string of jobIds to match Firebase
  name: string;
  phoneNumber: string | null;
  verified: boolean;
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
  workingDays: string;
  salary: string;
  probationPeriod: string;
  employeeBenefit: string;
  otherInfo: string;
  visible: object;
  category: string;
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
