import {
  authorize,
  fetchComments,
  fetchRoles,
  fetchSketch,
  fetchUserBySessionHash,
  fetchUsers,
  logout,
  register,
  removeComment,
  removeUser,
  saveCommentUpdates,
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
  removeComment,
  saveUserUpdates,
  saveCommentUpdates,
};
