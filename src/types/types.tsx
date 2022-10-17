import firebase from 'firebase/app';

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

export interface Job {
  contact_info: string;
  description: string;
  employer: string;
  // note: look into what type the date should be in
  end_date: Date;
  hours: number;
  job_creator: string;
  salary: number;
  start_date: string;
}
