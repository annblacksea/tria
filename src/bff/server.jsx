import {
  authorize,
  fetchRoles,
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
  removeUser,
  saveUserUpdates,
};
