import { addComment, getUserById, getUserIdFromSession } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';
import { transformComment } from '../transformers';

export const addNewComment = async (session, sketchId, text) => {
  const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.USER];

  if (!(await sessions.access(session, accessRoles))) {
    return { res: null, error: 'Доступ к функции добавления комментария запрещен' };
  }

  try {
    const userId = await getUserIdFromSession(session);
    const user = await getUserById(userId);
    const saveNewComment = await addComment(userId, sketchId, text);
    if (!saveNewComment) {
      return { error: 'Не удалось добавить комментарий', res: null };
    }

    const newComment = {
      ...transformComment(saveNewComment),
      authorLogin: user.login,
    };

    return { res: newComment, error: null };
  } catch (error) {
    console.error(error);
    return { res: null, error: 'Ошибка на сервере' };
  }
};
