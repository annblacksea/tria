import {
  authorize,
  fetchRoles,
  fetchUserBySessionHash,
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
  fetchUserBySessionHash,
  fetchRoles,
  removeUser,
  saveUserUpdates,
};
