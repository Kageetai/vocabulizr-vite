import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Selector } from 'react-redux';

import { RootState } from '../store';
import prompts from '../constants/prompts.json';

const undoneFilter = (p: Prompt) => !p.done;
const doneFilter = (p: Prompt) => p.done;
const selectPrompts = (state: RootState) => state.prompts;

export const selectPromptByIndex = (
  index: number,
): Selector<RootState, Prompt | undefined> =>
  createSelector(selectPrompts, (app) => app.prompts[index]);

export const selectCurrentPrompt = createSelector(selectPrompts, (app) =>
  app.prompts.find(undoneFilter),
);

export const selectDonePrompts = createSelector(selectPrompts, (app) =>
  app.prompts.filter(doneFilter),
);

export const selectPromptLength = createSelector(
  selectPrompts,
  (app) => app.prompts.length,
);

export interface Prompt {
  word: string;
  phrase: string;
  hint: string;
  accepted: string[];
  explanation: string;
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
