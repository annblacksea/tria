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
    updateCommentData(state, action) {
      const updatedComment = state.find((comment) => comment.id === action.payload.id);
      updatedComment.text = action.payload.text;
    },
    deleteCommentData(state, action) {
      return state.filter((comment) => {
        comment.id !== action.payload;
      });
    },
  },
});

export const { setCommentsData, updateCommentData, deleteCommentData } = commentsSlice.actions;

export default commentsSlice.reducer;
