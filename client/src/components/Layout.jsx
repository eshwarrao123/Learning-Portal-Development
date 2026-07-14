import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 container mx-auto max-w-6xl px-4 py-8">
      <Outlet />
    </main>
  </div>
);

export default Layout;
