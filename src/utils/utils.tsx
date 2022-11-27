import { User } from '../types/types';

export const getEmptyUser = (): User => {
  return {
    id: '',
    access: '',
    createdJobs: [],
    email: '',
    likedJobs: [],
    name: '',
    phoneNumber: '',
    verified: false
  };
};
