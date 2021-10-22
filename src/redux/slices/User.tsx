import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { isAPIResponse } from '@/types/API';
import { LoginInput, UserFulfilled, UserResponse } from '@/types/User';
import { users_token_create } from '@/utils/API';
import { StoreShape } from '@/redux/store-types';

export const fetchLogin = createAsyncThunk<
  UserFulfilled,
  LoginInput,
  { rejectValue: string }
>('login', async (inputData, { rejectWithValue }) => {
  try {
    const response = await users_token_create(inputData);
    if (isAPIResponse(response)) return response.data;
  } catch (err: any) {
    return rejectWithValue(err);
  }
});

const initialStoredUser: UserFulfilled | false | null =
  typeof localStorage !== 'undefined' &&
  JSON.parse(localStorage.getItem('user') as string);

const userInitialState: UserResponse = {
  data: {
    ...(initialStoredUser
      ? initialStoredUser
      : {
          access: '',
          refresh: '',
          id: 0,
          username: '',
          email: '',
          full_name: '',
          message: '',
          accessibility: '',
        }),
  },
  isLoading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'login',
  initialState: userInitialState,
  reducers: {
    logout: (state) => {
      const baseData: UserFulfilled = {
        access: '',
        refresh: '',
        id: 0,
        username: '',
        email: '',
        full_name: '',
        message: '',
        accessibility: '',
      };
      state.data = baseData;
      if (typeof localStorage !== 'undefined')
        localStorage.setItem('user', JSON.stringify(baseData));
    },
    resetError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, () => ({
        data: userInitialState.data,
        isLoading: true,
        error: '',
      }))
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.data = action.payload.username
          ? action.payload
          : userInitialState.data;
        state.isLoading = false;
        state.error = action.payload.username ? '' : 'Something went wrong!';

        localStorage?.setItem('user', JSON.stringify(state.data));
      })
      .addCase(fetchLogin.rejected, () => ({
        data: userInitialState.data,
        isLoading: false,
        error: 'Something went wrong!',
      }));
  },
});

const selectSlice = (state: StoreShape) => state.user;

export const selectUser = createSelector(selectSlice, (slice) => slice.data);

export const selectLoginError = createSelector(
  selectSlice,
  (slice) => slice.error,
);

export const selectLoginLoading = createSelector(
  selectSlice,
  (slice) => slice.isLoading,
);

export const { logout, resetError } = userSlice.actions;
