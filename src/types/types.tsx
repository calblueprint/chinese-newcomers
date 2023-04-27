
export interface RegularUser {
  id: string;
  access: string;
  phoneNumber: string | null;
  verified: boolean;
  likedJobs: string[];
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
  website: string | null;
}


export interface Job {
  id: string;
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
  otherInfo: string;
  visible: object;
  liked: boolean;
  category: string;
}
