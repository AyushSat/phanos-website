import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';

function Callback() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
        navigate('/'); 
    } else if (auth.error) {
        console.error('Authentication error during callback:', auth.error);
    }
  }, [auth.isAuthenticated, auth.error, navigate]);

  return (
    <div>
      <p>Processing login...</p>
      {auth.isLoading && <p>Loading...</p>}
      {auth.error && <p>Error: {auth.error.message}</p>}
    </div>
  );
}

export default Callback;