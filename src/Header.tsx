// Header.tsx
import React from 'react';
import { useAuth } from "react-oidc-context";
import { DEV_URL, PRODUCTION_URL } from './constants';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "4get5f78j454a695eoj7r06k13";
    const logoutUri = import.meta.env.DEV ? DEV_URL : PRODUCTION_URL;
    const cognitoDomain = "https://aesthetichomographya7ad08f01-7ad08f01-dev.auth.us-east-2.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  return (
    <header className="w-full bg-purple-600 text-white px-6 py-4 flex justify-between items-start fixed top-0 left-0 z-50">
          <Link to="/">
          <h1 className="text-2xl font-bold text-white no-underline hover:no-underline">Phanos</h1>
        </Link>
       
    <div className="flex items-center gap-4 text-white">
      {auth.isLoading ? (
        <span className="text-sm">Loading...</span>
      ) : auth.isAuthenticated ? (
        <>
          <button
            onClick={() => signOutRedirect()}
            className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md text-sm font-semibold"
          >
            Sign Out
          </button>
          <Link
  to="/users"
  className="text-sm text-white no-underline hover:text-white visited:text-white active:text-white focus:text-white"
>
  <p className="text-sm text-white">Hello, </p><p className="text-sm text-white hover:text-white visited:text-white active:text-white focus:text-white">{auth.user?.profile.email}</p>
</Link>
        </>
      ) : (
        <>
          <button
            onClick={() => auth.signinRedirect()}
             className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md text-sm font-semibold"
          >
            Sign In
          </button>
        </>
      )}
    </div>
  </header>
  );
};

export default Header;