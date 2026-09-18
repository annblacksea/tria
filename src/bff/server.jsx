import {
  authorize,
  fetchComments,
  fetchRoles,
  fetchSketch,
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
  fetchSketch,
  fetchComments,
  removeUser,
  saveUserUpdates,
};
