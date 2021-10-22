import { UserResponse } from '@/types/User';
import { SearchState } from '@/types/Search';

export type StoreShape = {
  user: UserResponse;
  search: SearchState;
};
