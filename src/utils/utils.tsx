import { User } from '../types/types';

const getEmptyUser = (): User => ({
  id: '',
  access: '',
  createdJobs: [],
  email: '',
  bookmarkedJobs: [],
  name: '',
  phoneNumber: '',
  verified: false,
});

export default getEmptyUser;
