import { Route, Router, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Authorisation, Registration, UserPage, Users } from './pages';
import styles from './App.module.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Authorisation />} />
        <Route path="/registration" element={<Registration />} />

        <Route element={<Layout />}>
          <Route path="/" element={<div>Главная</div>} />
          <Route path="/profile/:id" element={<UserPage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/sketch/:sketchId" element={<p>Этюд</p>} />
          <Route path="/create-sketch" element={<p>Создать этюд</p>} />
          <Route path="/messages" element={<p>Сообщения</p>}>
            <Route path="message:messageId" element={<p>Одно сообщение</p>} />
          </Route>
          <Route />
        </Route>
      </Routes>
    </>
  );
}

export default App;
