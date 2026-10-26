import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  author: null,
  title: '',
  images: [],
  description: '',
  publishedAt: '',
};

const sketchSlice = createSlice({
  name: 'sketch',
  initialState,
  reducers: {
    setSketchData(state, action) {
      console.log(action.payload);
      return action.payload;
    },
  },
});

export const { setSketchData } = sketchSlice.actions;

export default sketchSlice.reducer;
