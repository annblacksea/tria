import { createSlice } from '@reduxjs/toolkit';
import { ROLE } from '../constants/roles';
import { server } from '../bff/server';

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
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userData = action.payload.userData;
      state.session = action.payload.session;
      console.log(action.payload);
    },
    logout() {
      return initialState;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
