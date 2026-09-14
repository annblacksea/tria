export const getUserIdFromSession = async (hash) => {
  try {
    const response = await fetch(`http://localhost:3000/sessions?session_hash=${hash}`);

    if (!response.ok) {
      throw new Error('Ошибка при запросе к базе данных');
    }

    const loadedSession = await response.json();
    const [session] = loadedSession;

    return session?.user_id;
  } catch {
    return null;
  }
};
