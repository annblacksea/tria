import { getComments } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const fetchComments = async (session, sketchId) => {
  const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.USER, ROLE.GUEST];

  if (!(await sessions.access(session, accessRoles))) {
    return { res: null, error: 'Доступ запрещен' };
  }

  try {
    const commentsList = await getComments(sketchId);
    return {
      error: null,
      res: commentsList,
    };
  } catch (error) {
    return { error: error.message, res: null };
  }
};
