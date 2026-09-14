export const getSessionByHash = async (hash) => {
  try {
    const response = await fetch(`http://localhost:3000/sessions?session_hash=${hash}`);

    if (!response.ok) {
      throw new Error('Сессия не существует');
    }

    const loadedSession = await response.json();
    const [session] = loadedSession;

    return session;
  } catch (error) {
    console.error(error);
    return false;
  }
};
