import { createSlice } from '@reduxjs/toolkit';
import { ROLE } from '../constants/roles';

const initialState = {
  userData: {
    id: null,
    login: null,
    roleId: ROLE.GUEST,
    registeredAt: null,
    // avatar: null,
    //добавить также изображение по-умолчанию
  },
  session: null,
  isInitialized: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userData = action.payload.userData || initialState.userData;
      state.session = action.payload.session;
      state.isInitialized = true;
      console.log(action.payload);
    },
    logout() {
      return { ...initialState, isInitialized: true };
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
