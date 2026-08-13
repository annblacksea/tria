export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error('Ошибка при удалении пользователя на сервере');
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
