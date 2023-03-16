export interface genericUser {
  id: string;
  access: string;
  email: string | null;
  name: string;
  phoneNumber: string | null;
  verified: boolean;
}

export interface RegularUser extends genericUser {
  likedJobs: string[];
}

export interface Admin extends genericUser {
  createdJobs: string[];
}

export interface Employer extends genericUser {
  createdJobs: string[];
}

export type User = RegularUser | Admin | Employer;

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
