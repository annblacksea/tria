import { useEffect, useState } from 'react';
import { useServerRequest } from '../hooks';
import { H2, SectionCard, UserRow } from './../components';
import { ROLE } from '../constants/roles';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
  const requestServer = useServerRequest();

  useEffect(() => {
    (async () => {
      try {
        const [usersRes, rolesRes] = await Promise.all([
          requestServer('fetchUsers'),
          requestServer('fetchRoles'),
        ]);

        const error = usersRes.error || rolesRes.error;

        if (error) {
          setErrorMessage(error);
          return;
        }
        console.log('Данные пользователей:', usersRes);
        console.log('Ошибка данные пользователей:', error);
        setUsers(usersRes?.res);
        setRoles(rolesRes?.res);
      } catch (error) {
        setErrorMessage('Ошибка загрузки данных');
        console.error('Критическая ошибка:', error);
      }
    })();
  }, [requestServer, shouldUpdateUserList]);

  const onUserRemove = async (userId) => {
    try {
      requestServer('removeUser', userId);
      setShouldUpdateUserList(!shouldUpdateUserList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SectionCard title={'Список пользователей'}>
      {errorMessage ? (
        <p className="text-center">{errorMessage}</p>
      ) : (
        <div className="px-20">
          <ul className="m-auto ">
            {users.map(({ id, login, roleId }) => (
              <UserRow
                key={id}
                login={login}
                roleId={roleId}
                roles={roles.filter(({ id }) => id !== ROLE.GUEST)}
                onUserRemove={() => onUserRemove(id)}
                userId={id}
              />
            ))}
          </ul>
        </div>
      )}
    </SectionCard>
  );
};
