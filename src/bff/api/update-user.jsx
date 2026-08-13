export const updateUser = async (userId, newData = {}) => {
  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      throw new Error('Ошибка при изменении данных пользователя в базе');
    }

    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};
