import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export const selectUndoneIndex = createSelector(selectPrompts, (app) =>
  app.prompts.findIndex(undoneFilter),
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
  image?: string;
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
    markPromptAsDone: (state, action: PayloadAction<number>) => {
      state.prompts[action.payload].done = true;
    },
    saveScreenshot: (
      state,
      action: PayloadAction<{ index: number; imageSrc: string }>,
    ) => {
      state.prompts[action.payload.index].image = action.payload.imageSrc;
    },
    reset: () => {
      return initialState;
    },
  },
});

export const { markPromptAsDone, saveScreenshot, reset } = promptsSlice.actions;

export default promptsSlice.reducer;
