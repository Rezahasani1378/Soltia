import { userSlice } from '@/redux/slices/User';
import { searchSlice } from '@/redux/slices/Search';

const rootReducer = {
  [userSlice.name]: userSlice.reducer,
  [searchSlice.name]: searchSlice.reducer,
};

export default rootReducer;
