import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  authorId: '',
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
    resetSketchData() {
      return initialState;
    },
  },
});

export const { setSketchData, resetSketchData } = sketchSlice.actions;

export default sketchSlice.reducer;
