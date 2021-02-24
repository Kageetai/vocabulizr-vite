import { configureStore } from '@reduxjs/toolkit';

import words from './reducers/words';

const store = configureStore({ reducer: { words } });

export type RootState = ReturnType<typeof store.getState>;

export default store;
