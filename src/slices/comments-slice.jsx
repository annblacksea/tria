import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setCommentsData(state, action) {
      console.log(action.payload);
      return action.payload;
    },
  },
});

export const { setCommentsData } = commentsSlice.actions;

export default commentsSlice.reducer;
