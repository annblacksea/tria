import { Route, Router, Routes } from 'react-router-dom';
import { useEffect, useLayoutEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { Authorisation, Main, Registration, Sketch, UserPage, Users } from './pages';
import styles from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from './hooks';
import { setUser } from './slices/user-slice';
import { selectIsInitialized } from './selectors';
import { Modal } from './components';

function App() {
  const serverRequest = useServerRequest();
  const dispatch = useDispatch();
  const isInitialized = useSelector(selectIsInitialized);

  useEffect(() => {
    const currentSessionHash = sessionStorage.getItem('hash');

    if (!currentSessionHash) {
      dispatch(setUser({ userData: null, session: null }));
      return;
    }

    serverRequest('fetchUserBySessionHash', currentSessionHash).then((result) => {
      if (result.error || !result.res) {
        sessionStorage.removeItem('hash');
      }

      dispatch(setUser(result.res));
    });
  }, [serverRequest]);

  return isInitialized ? (
    <>
      <Routes>
        <Route path="/auth" element={<Authorisation />} />
        <Route path="/registration" element={<Registration />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/profile/:id" element={<UserPage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/sketch/:id" element={<Sketch />} />
          <Route path="/sketch/:id/edit" element={<Sketch />} />
          <Route path="/sketch" element={<Sketch />} />
          <Route />
        </Route>
      </Routes>
      <Modal />
    </>
  ) : (
    <div>Загрузка...</div>
  );
}

export default App;
