export interface SearchState {
  searchResults: SearchFulfilled;
  history: SearchHistory;
}

export interface HistoryItem {
  title: string;
  date: string;
}

export type SearchHistory = Array<HistoryItem> | never;

interface Search {
  word: string;
  score: number;
}

export type SearchFulfilled = {
  words: any;
  isLoading: boolean;
  isError: boolean;
};
