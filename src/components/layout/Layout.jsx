import { Outlet } from 'react-router-dom';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';

export const Layout = () => {
  return (
    <div className="pageWrapper px-10 py-5 bg-gray-100">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
