import { configureStore } from '@reduxjs/toolkit';
import userReduser from './slices/user-slice';
import sketchSlice from './slices/sketch-slice';
import commentsSlice from './slices/comments-slice';

export const store = configureStore({
  reducer: { user: userReduser, sketch: sketchSlice, sketches: {}, comments: commentsSlice },
});
