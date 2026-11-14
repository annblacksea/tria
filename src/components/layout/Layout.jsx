import { Outlet } from 'react-router-dom';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';

export const Layout = () => {
  return (
    <div className="pageWrapper px-10 py-5 bg-background text-main-text">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
