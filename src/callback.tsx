import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';

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
      {auth.isLoading && <p>Logging in...</p>}
      {!auth.isLoading && auth.error && <p>Error: {auth.error.message}</p>}
    </div>
  );
}

export default Callback;