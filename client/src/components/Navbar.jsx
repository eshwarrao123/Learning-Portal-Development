import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Button from './ui/Button';
import Badge from './ui/Badge';

const NAV_LINKS = [
  { to: '/', label: 'Dashboard' },
  { to: '/bookmarks', label: 'Bookmarks' },
  { to: '/profile', label: 'Profile' },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur border-b border-gray-800">
      <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">

        {/* Brand */}
        <Link to="/" className="text-xl font-bold text-white tracking-tight">
          Learning <span className="text-brand-500">Portal</span>
        </Link>

        {/* Nav links */}
        <ul className="hidden sm:flex items-center gap-1" role="list">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive
                    ? 'bg-brand-600/20 text-brand-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          {user?.role === 'admin' && (
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-brand-600/20 text-brand-400' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`
                }
              >
                Admin
              </NavLink>
            </li>
          )}
        </ul>

        {/* User + logout */}
        <div className="flex items-center gap-3">
          {user?.role === 'admin' && <Badge variant="brand">Admin</Badge>}
          <span className="hidden sm:block text-sm text-gray-400 truncate max-w-[160px]">
            {user?.name}
          </span>
          <Button variant="ghost" onClick={handleLogout} className="text-sm px-3 py-1.5">
            Logout
          </Button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
