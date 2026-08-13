import { ROLE } from '../constants';
import { transformUser } from '../transformers';
import { generateDate } from '../utils';

export const createUser = async (login, password) => {
  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        login,
        password,
        registered_at: generateDate(),
        role_id: ROLE.USER,
      }),
    });
    if (!response.ok) {
      throw new Error('Ошибка создания пользователя');
    }

    const createdUser = await response.json();

    return transformUser(createdUser); //возврат информации о пользователе с уже правильными полями
  } catch {
    console.error(error.message);
    return null;
  }
};

// export const createUser = (login, password) =>
//   fetch('http://localhost:3000/users', {
//     method: 'POST',
//     headers: { 'Content-type': 'application/json;charset=utf-8' },
//     body: JSON.stringify({
//       login,
//       password,
//       registered_at: generateDate(),
//       role_id: ROLE.USER,
//     }),
//   }).then((createdUser) => createdUser.json());
