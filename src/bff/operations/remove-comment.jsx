import { deleteComment } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removeComment = async (session, ownerId, commentId) => {
  const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

  if (!sessions.access(session, accessRoles, ownerId)) {
    return { res: null, error: 'Доступ к функции удаления комментария запрещен' };
  }

  const isCommentDeleted = await deleteComment(commentId);

  if (!isCommentDeleted) {
    return { res: null, error: 'Не удалось удалить комментарий' };
  }

  return { res: true, error: null };
};
