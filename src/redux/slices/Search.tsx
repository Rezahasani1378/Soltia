import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  HistoryItem,
  SearchState,
  SearchFulfilled,
  SearchHistory,
} from '@/types/Search';
import { searchAPI } from '@/utils/API';
import { isAPIResponse } from '@/types/API';
import { StoreShape } from '@/redux/store-types';

const initialStoredHistory: SearchHistory =
  typeof localStorage !== 'undefined' && localStorage.getItem('searchHistory')
    ? JSON.parse(localStorage.getItem('searchHistory') as string)
    : [];

export const fetchSearch = createAsyncThunk<
  SearchFulfilled,
  string,
  { rejectValue: string }
>('search', async (searchData, { rejectWithValue }) => {
  try {
    const response = await searchAPI(searchData);
    if (isAPIResponse(response)) return response.data;
  } catch (err: any) {
    return rejectWithValue(err);
  }
});

const updateStorage = (newState: SearchHistory) =>
  localStorage?.setItem('searchHistory', JSON.stringify(newState));

const initialState: SearchState = {
  searchResults: {
    words: [],
    isError: false,
    isLoading: true,
  },
  history: initialStoredHistory,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetResults: (state) => {
      state.searchResults = {
        words: [],
        isLoading: true,
        isError: false,
      };
    },
    setHistory: (state, { payload }: PayloadAction<HistoryItem>) => {
      state.history.unshift(payload);
      updateStorage(state.history);
    },
    removeItem: (state, { payload }: PayloadAction<number>) => {
      if (payload > -1) state.history.splice(payload, 1);
      updateStorage(state.history);
    },
    resetHistory: (state) => {
      state.history = [];
      updateStorage(state.history);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.searchResults = {
          words: action.payload,
          isLoading: false,
          isError: false,
        };
      })
      .addCase(fetchSearch.pending, (state) => {
        state.searchResults = {
          words: [],
          isLoading: true,
          isError: false,
        };
      })
      .addCase(fetchSearch.rejected, (state) => {
        state.searchResults = {
          words: [],
          isLoading: false,
          isError: true,
        };
      }),
});

const selectSearchSlice = (state: StoreShape) => state.search;

export const selectSearch = createSelector(
  selectSearchSlice,
  (slice) => slice.searchResults,
);

export const selectHistory = createSelector(
  selectSearchSlice,
  (slice) => slice.history,
);

export const { resetResults, setHistory, removeItem, resetHistory } =
  searchSlice.actions;
