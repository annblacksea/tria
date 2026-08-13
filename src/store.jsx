import { configureStore } from '@reduxjs/toolkit';
import userReduser from './slices/user-slice';

export const store = configureStore({
  reducer: { user: userReduser, users: {}, sketch: {}, sketches: {} },
});
