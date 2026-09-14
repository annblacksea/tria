export const deleteSession = async (sessionId) => {
  try {
    const response = await fetch(`http://localhost:3000/sessions/${sessionId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Ошибка при удалении сессии пользователя на сервере');
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
