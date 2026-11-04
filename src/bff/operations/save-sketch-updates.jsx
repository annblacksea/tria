import { updateSketch } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const saveSketchUpdates = async (session, ownerId, sketchId, sketchData) => {
  const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

  if (!(await sessions.access(session, accessRoles, ownerId))) {
    return { res: null, error: 'Доступ к функции изменения этюда запрещен' };
  }

  try {
    const result = await updateSketch(sketchId, sketchData);

    if (!result) {
      return { error: 'Не удалось обновить этюд', res: null };
    }

    return { error: null, res: result };
  } catch (error) {
    console.error(error);
    return { res: null, error: 'Ошибка на сервере' };
  }
};
