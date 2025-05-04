import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthState {
  from?: string;
}

function Callback() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
        const state = auth.user?.state as AuthState;
        const returnTo = state?.from || '/';
        navigate(returnTo);
    } else if (auth.error) {
        console.error('Authentication error during callback:', auth.error);
    }
  }, [auth.isAuthenticated, auth.error, navigate, auth.user?.state]);

  return (
    <div>
      <p>Processing login...</p>
      {auth.isLoading && <p>Loading...</p>}
      {auth.error && <p>Error: {auth.error.message}</p>}
    </div>
  );
}

export default Callback;