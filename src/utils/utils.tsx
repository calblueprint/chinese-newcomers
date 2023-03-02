import { User } from '../types/types';

const getEmptyUser = (): User => ({
  id: '',
  access: '',
  createdJobs: [],
  email: '',
  likedJobs: [],
  name: '',
  phoneNumber: '',
  verified: false,
});

export default getEmptyUser;
