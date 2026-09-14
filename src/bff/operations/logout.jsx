import { sessions } from '../sessions';

export const logout = async (sessionHash) => {
  await sessions.remove(sessionHash);
};
