import {
  createSession,
  deleteSession,
  getSessionByHash,
  getUserById,
  getUserIdFromSession,
} from './api';

export const sessions = {
  async create(user) {
    const hash = Math.random().toFixed(15).slice(3);
    await createSession(user, hash);
    return hash;
  },
  async remove(sessionHash) {
    const session = await getSessionByHash(sessionHash);
    await deleteSession(session?.id);
  },
  async access(sessionHash, accessRoles) {
    const userId = await getUserIdFromSession(sessionHash);
    const user = await getUserById(userId);
    return !!user && accessRoles.includes(user.roleId);
  },
};
