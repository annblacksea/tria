import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  onConfirm: null,
  confirmData: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action) {
      state.isOpen = true;
      state.onConfirm = action.payload.onConfirm;
      state.confirmData = action.payload.confirmData;
    },
    closeModal() {
      return initialState;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
