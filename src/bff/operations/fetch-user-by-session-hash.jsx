import { getUserById, getUserIdFromSession } from '../api';

export const fetchUserBySessionHash = async (hash) => {
  try {
    const userId = await getUserIdFromSession(hash);

    if (!userId) {
      throw new Error('Не найден Id пользователя');
    }

    const user = await getUserById(userId);

    if (!user) {
      throw new Error('Пользователь с таким Id отсутствует в базе данных');
    }

    return {
      error: null,
      res: { userData: { ...user }, session: hash },
    };
  } catch (error) {
    return { error: error.message, res: null };
  }
};
