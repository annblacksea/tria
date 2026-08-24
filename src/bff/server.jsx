import {
  authorize,
  fetchRoles,
  fetchSketch,
  fetchUsers,
  logout,
  register,
  removeUser,
  saveUserUpdates,
} from './operations';

export const server = {
  logout,
  authorize,
  register,
  fetchUsers,
  fetchRoles,
  fetchSketch,
  removeUser,
  saveUserUpdates,
};
