import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

const KEY = 'words';
export const words: string[] = JSON.parse(localStorage.getItem(KEY) || '[]');

const saveWords = (words: string[]) =>
  localStorage.setItem(KEY, JSON.stringify(words));

export const selectWords = createSelector(
  (state: RootState) => state.words,
  (app) => app.words,
);

export interface State {
  words: string[];
}

const initialState: State = {
  words,
};

const appSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      if (!state.words.includes(action.payload)) {
        state.words.push(action.payload);
      }

      saveWords(state.words);
    },
    remove: (state, action: PayloadAction<string>) => {
      state.words = state.words.filter((word) => word !== action.payload);

      saveWords(state.words);
    },
  },
});

export const { add, remove } = appSlice.actions;

export default appSlice.reducer;
