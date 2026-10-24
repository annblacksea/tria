import { updateComment } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const saveCommentUpdates = async (session, ownerId, commentId, text) => {
  const accessRoles = [ROLE.ADMIN];
  if (!(await sessions.access(session, accessRoles, ownerId))) {
    return { res: null, error: 'Доступ к функции изменения комментария запрещен' };
  }

  try {
    const saveUpdates = await updateComment(commentId, text);

    if (!saveUpdates) {
      return { error: 'Не удалось обновить комментарий', res: null };
    }
    return { error: null, res: true };
  } catch (error) {
    console.error(error);
    return { res: null, error: 'Ошибка на сервере' };
  }
};
