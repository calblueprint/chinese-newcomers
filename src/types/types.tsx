import firebase from 'firebase/app';

export type User = {
  id: string;
  access: string;
  createdJobs: string[]; //switched to string of jobIds to match Firebase
  email: string | null;
  likedJobs: string[]; //switched to string of jobIds to match Firebase
  name: string;
  phoneNumber: string | null;
  verified: boolean;
  // note: is password necessary here or in firebase?
  password: string | null;
};

export type Job = {
  contact_info: string;
  description: string;
  employer: string;
  // note: look into what type the date should be in
  end_date: Date;
  hours: number;
  // note: maybe set type to User
  job_creator: string;
  salary: number;
  start_date: string;
};
