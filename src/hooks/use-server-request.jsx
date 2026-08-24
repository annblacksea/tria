import { useSelector } from 'react-redux';
import { selectUserSession } from './../selectors';
import { useCallback } from 'react';
import { server } from '../bff/server';

export const useServerRequest = () => {
  const session = useSelector(selectUserSession);

  return useCallback(
    (operation, ...params) => {
      // ...params - логин, пароль
      const request = ['register', 'authorize', 'fetchSketch'].includes(operation)
        ? params
        : [session, ...params];
      //определяется, нужно ли передавать хэш сессии
      return server[operation](...request);
    },
    [session]
  );
};
