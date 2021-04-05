import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import prompts from '../constants/prompts.json';

const undoneFilter = (p: Prompt) => !p.done;
const doneFilter = (p: Prompt) => p.done;

export const selectPrompts = createSelector(
  (state: RootState) => state.prompts,
  (app) => app.prompts,
);

export const selectCurrentPrompt = createSelector(
  (state: RootState) => state.prompts,
  (app) => app.prompts.find(undoneFilter),
);

export const selectDonePrompts = createSelector(
  (state: RootState) => state.prompts,
  (app) => app.prompts.filter(doneFilter),
);

export interface Prompt {
  word: string;
  phrase: string;
  hint: string;
  accepted: string[];
  done: boolean;
}

export interface State {
  prompts: Prompt[];
}

const initialState: State = {
  prompts,
};

const promptsSlice = createSlice({
  name: 'prompts',
  initialState,
  reducers: {
    markCurrentAsDone: (state) => {
      const current = state.prompts.find(undoneFilter);
      if (current) {
        current.done = true;
      }
    },
  },
});

export const { markCurrentAsDone } = promptsSlice.actions;

export default promptsSlice.reducer;
