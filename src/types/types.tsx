export interface User {
  id: string;
  access: string;
  createdJobs: string[]; // switched to string of jobIds to match Firebase
  email: string | null;
  likedJobs: string[]; // switched to string of jobIds to match Firebase
  name: string;
  phoneNumber: string | null;
  verified: boolean;
}

// export interface Job {
//   contact_info: string;
//   description: string;
//   employer: string;
//   // note: look into what type the date should be in
//   end_date: Date;
//   hours: number;
//   // note: maybe set type to User
//   job_creator: string;
//   salary: number;
//   start_date: string;
// }

export interface Job {
  jobId: string;
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
