import { User } from '../types/types';

export const getEmptyUser = (): User => ({
    id: '',
    access: '',
    createdJobs: [],
    email: '',
    likedJobs: [],
    name: '',
    phoneNumber: '',
    verified: false
  });
