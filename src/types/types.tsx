import { Timestamp } from 'firebase/firestore';

export interface User {
  id: string;
  access: string;
  createdJobs: object; // switched to map of jobIDs and bool isApproved status to match Firebase
  email: string | null;
  likedJobs: string[]; // switched to string of jobIds to match Firebase
  name: string;
  phoneNumber: string | null;
  verified: boolean;
}

export const User : User = {
  id: "",
  access: "",
  createdJobs: Object(), // switched to map of jobIDs and bool isApproved status to match Firebase
  email: "",
  likedJobs: [], // switched to string of jobIds to match Firebase
  name: "",
  phoneNumber: "",
  verified: true,
}

export interface Job {
  id: string;
  date: Timestamp;
  creator: string;
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

export const jobInstance : Job = {
  id: "",
  date: new Timestamp(0, 0),
  creator: "",
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
  category: '',
};
