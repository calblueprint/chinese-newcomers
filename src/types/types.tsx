export interface User {
  id: string;
  access: string;
  createdJobs: Job[];
  email: string;
  likedJobs: Job[];
  name: string;
  phoneNumber: string;
  verified: boolean;
  // note: is password necessary here or in firebase?
  password: string;
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
  date: Date;
  companyName: string;
  address: string;
  contactPerson: string;
  phone: string;
  jobPosition: string;
  languageRequirement: string;
  workingHours: string;
  workingDays: string;
  salary: number;
  probationPeriod: string;
  employeeBenefit: string;
  otherInfo: string;
}
