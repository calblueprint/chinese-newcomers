import { RegularUser } from '../types/types';

const getEmptyUser = (): RegularUser => ({
  id: '',
  access: '',
  bookmarkedJobs: [],
  phoneNumber: '',
  verified: false,
});

export default getEmptyUser;
