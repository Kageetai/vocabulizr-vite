import { configureStore } from '@reduxjs/toolkit';

import prompts from './reducers/prompts';

const store = configureStore({ reducer: { prompts } });

export type RootState = ReturnType<typeof store.getState>;

export default store;
