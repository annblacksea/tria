export const createSession = async (user, hash) => {
  try {
    const response = await fetch('http://localhost:3000/sessions', {
      method: 'POST',
      headers: { 'Content-type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        user_id: user.id,
        session_hash: hash,
      }),
    });

    if (!response.ok) {
      throw new Error('Ошибка создания сессии пользователя');
    }

    return true;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};
