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
    <header className="bg-gray-200 px-6 py-4 flex justify-between items-center">
      <h1 className="text-sm font-light">Phanos</h1>
      <div className="flex gap-2 items-center">
        {auth.isLoading ? (
          <span>Loading...</span>
        ) : auth.isAuthenticated ? (
          <button
            onClick={() => auth.removeUser()}
            className="text-sm text-black hover:underline"
          >
            Sign Out
          </button>
        ) : (
          <>
            <button
              onClick={() => auth.signinRedirect()}
              className="text-sm text-black hover:underline"
            >
              Sign In
            </button>
            <button
              onClick={signOutRedirect}
              className="text-sm text-black hover:underline"
            >
              Sign Out
            </button>
          </>
        )}
        {auth.isAuthenticated && (
  <span className="text-xs text-gray-600">Hello, {auth.user?.profile.email}</span>
)}
      </div>
    </header>
  );
};

export default Header;