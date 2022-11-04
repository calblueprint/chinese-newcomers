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
  // note: date type depends on what's best for Stephanie to implement. string for now
  start_date: string;
  end_date: string;
  hours: string;
  // note: maybe set type to User
  job_creator: string;
  salary: string;
  other_info: string;
  hidden: Map<string, boolean>;
}
