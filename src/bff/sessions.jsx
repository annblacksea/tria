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
  async access(sessionHash, accessRoles = [], ownerId) {
    const userId = await getUserIdFromSession(sessionHash);
    if (!userId) return false;

    const user = await getUserById(userId);
    if (!user) return false;

    const hasRoleAccess = accessRoles.includes(user.roleId);
    const isOwner = ownerId ? userId === ownerId : false;

    return hasRoleAccess || isOwner;
  },
};
