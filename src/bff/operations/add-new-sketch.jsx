import { createSketch, getUserIdFromSession } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const addNewSketch = async (session, title, images = [], description) => {
  const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.USER];

  if (!(await sessions.access(session, accessRoles))) {
    return { res: null, error: 'Доступ к функции добавления этюда запрещен' };
  }

  try {
    const userId = await getUserIdFromSession(session);
    const newSketch = await createSketch(userId, title, images, description);
    if (!newSketch) {
      return { error: 'Не удалось добавить этюд', res: null };
    }

    return { res: newSketch, error: null };
  } catch (error) {
    console.error(error);
    return { res: null, error: 'Ошибка на сервере' };
  }
};
