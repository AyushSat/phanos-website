// Header.tsx
import React from 'react';
import { useAuth } from "react-oidc-context";
import { DEV_URL, PRODUCTION_URL } from './constants';

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
    <h1 className="text-2xl font-bold">Phanos</h1>
    <div className="flex items-center gap-4">
      {auth.isLoading ? (
        <span className="text-sm">Loading...</span>
      ) : auth.isAuthenticated ? (
        <>
          <button
            onClick={() => auth.removeUser()}
            className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md text-sm font-semibold"
          >
            Sign Out
          </button>
          <span className="text-sm">Hello, {auth.user?.profile.email}</span>
        </>
      ) : (
        <>
          <button
            onClick={() => auth.signinRedirect()}
             className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md text-sm font-semibold"
          >
            Sign In
          </button>
          <button
            onClick={signOutRedirect}
             className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md text-sm font-semibold"
          >
            Sign Out
          </button>
        </>
      )}
    </div>
  </header>
  );
};

export default Header;